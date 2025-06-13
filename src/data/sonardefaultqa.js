export const Defaultqualitygates = {
  "default_quality_gate_id": "AYaYpyGhG6DhX83Uu648",
  "metric_values": [
    {
      "metric": "duplicated_lines_density",
      "operation": "GT",
      "value": "10.0"
    },
    {
      "metric": "reliability_rating",
      "operation": "GT",
      "value": "1"
    },
    {
      "metric": "sqale_rating",
      "operation": "GT",
      "value": "1"
    },
    {
      "metric": "security_hotspots_reviewed",
      "operation": "LT",
      "value": "100"
    },
    {
      "metric": "security_rating",
      "operation": "GT",
      "value": "1"
    },
    {
      "metric": "coverage",
      "operation": "LT",
      "value": "80"
    }
  ]
}