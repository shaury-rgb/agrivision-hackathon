import { useEffect, useMemo, useRef, useState } from 'react';
import { analyzeDisease } from '../api/client';
import { diseaseDatabase } from '../data/mockData';

function SeverityBadge({ severity }) {
  return <span className={`severity-badge ${severity.toLowerCase()}`}>{severity}</span>;
}

export default function DiseaseDetection({ userMobile = '9999999999' }) {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [imageName, setImageName] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const cropOptions = useMemo(() => {
    const all = diseaseDatabase
      .flatMap((item) => item.crop.split('/').map((crop) => crop.trim()))
      .filter(Boolean);
    return [...new Set(all)];
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        window.URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const setSelectedFile = (file) => {
    if (!file) {
      setImageName('');
      setImagePreview('');
      return;
    }

    setImageName(file.name);
    const nextPreview = window.URL.createObjectURL(file);
    setImagePreview((prev) => {
      if (prev) {
        window.URL.revokeObjectURL(prev);
      }
      return nextPreview;
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    setSelectedFile(file);
    if (fileInputRef.current) {
      const transfer = new DataTransfer();
      transfer.items.add(file);
      fileInputRef.current.files = transfer.files;
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    try {
      const response = await analyzeDisease({
        crop: selectedCrop,
        imageName: imageName || 'sample-leaf.jpg',
        mobile: userMobile,
      });
      setResult(response.diagnosis);
    } catch {
      const matched = diseaseDatabase.find((item) =>
        item.crop.toLowerCase().includes(selectedCrop.toLowerCase())
      );
      setResult(matched ?? diseaseDatabase[0]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>Disease Detection</h1>
        <p>Upload a crop image and get instant diagnosis with treatment recommendations.</p>
      </div>

      <div className="feature-card">
        <div className="input-grid">
          <label className="field">
            <span>Crop Type</span>
            <select value={selectedCrop} onChange={(event) => setSelectedCrop(event.target.value)}>
              {cropOptions.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Leaf Image</span>
            <div
              className={`upload-box ${isDragOver ? 'drag-over' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              {imagePreview ? (
                <div className="upload-preview">
                  <img src={imagePreview} alt="Selected leaf preview" />
                  <p>Click or drop another image to replace</p>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">↑</span>
                  <span className="upload-main">Drag and drop a crop image</span>
                  <span className="upload-sub">or click to browse files</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              className="hidden-file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {imageName ? <p className="input-note">Selected: {imageName}</p> : null}

        <button type="button" className="primary-btn" onClick={handleAnalyze} disabled={isAnalyzing}>
          <span className="btn-content">
            {isAnalyzing ? <span className="loading-spinner" aria-hidden="true" /> : null}
            <span>{isAnalyzing ? 'Analyzing...' : 'Run AI Scan'}</span>
          </span>
        </button>
      </div>

      {result ? (
        <div className="result-card">
          <div className="result-title-row">
            <h2>{result.name}</h2>
            <SeverityBadge severity={result.severity} />
          </div>
          <p className="confidence-line">Confidence: {result.confidence}%</p>

          <div className="result-columns">
            <div>
              <h3>Symptoms</h3>
              <ul>
                {result.symptoms.map((symptom) => (
                  <li key={symptom}>{symptom}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Treatment Plan</h3>
              <ul>
                {result.treatment.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Prevention</h3>
              <ul>
                {result.prevention.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
