import { useMemo, useState } from 'react';
import { analyzeDisease } from '../api/client';
import { diseaseDatabase } from '../data/mockData';

function SeverityBadge({ severity }) {
  return <span className={`severity-badge ${severity.toLowerCase()}`}>{severity}</span>;
}

export default function DiseaseDetection() {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [imageName, setImageName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const cropOptions = useMemo(() => {
    const all = diseaseDatabase
      .flatMap((item) => item.crop.split('/').map((crop) => crop.trim()))
      .filter(Boolean);
    return [...new Set(all)];
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setImageName(file ? file.name : '');
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    try {
      const response = await analyzeDisease({
        crop: selectedCrop,
        imageName: imageName || 'sample-leaf.jpg',
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
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>

        {imageName ? <p className="input-note">Selected: {imageName}</p> : null}

        <button type="button" className="primary-btn" onClick={handleAnalyze} disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing...' : 'Run AI Scan'}
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
