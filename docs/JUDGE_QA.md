# Judge Q&A Cheat Sheet

## Q1. What is unique vs existing agri apps?
- Unified workflow: disease + market + irrigation + season economics in one app.
- Decision-first outputs, not only dashboards.
- Persistent farmer context and history for continuity.

## Q2. Is this feasible in real-world deployment?
- Yes. Current stack is lightweight: React + Node + REST.
- Can run on free tiers for pilot.
- Data layer can be switched from JSON store to MongoDB without frontend changes.

## Q3. How does AI work currently?
- Rule-driven AI for MVP speed and reliability.
- Disease and irrigation decisions are explainable and deterministic.
- ML model integration is planned as drop-in for next sprint.

## Q4. How do farmers benefit economically?
- Better disease response reduces losses.
- Market-MSP visibility improves selling timing.
- Irrigation optimization lowers water/fuel cost.
- Season planning improves budget predictability.

## Q5. What about scalability?
- Stateless APIs are horizontally scalable.
- Data contracts already modular by feature domains.
- Can onboard new regions/crops with config + datasets.

## Q6. What are major risks and mitigations?
- Risk: data freshness. Mitigation: schedule API sync and source fallback.
- Risk: trust in recommendations. Mitigation: confidence + treatment rationale.
- Risk: connectivity. Mitigation: cached/fallback data path.

## Q7. What will you build next after hackathon?
- Real image model for disease detection.
- Multilingual speech and WhatsApp assistant.
- IoT sensor integration for automated alerts.
- Marketplace integrations for direct sell recommendations.
