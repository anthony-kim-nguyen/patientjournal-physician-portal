export function buildVitalsBundle(vitals, patientId) {
    const now = new Date().toISOString();
  
    return {
      resourceType: "Bundle",
      type: "collection",
      meta: {
        tag: [
          {
            system: "http://example.org/fhir/tags",
            code: "journal-entry",
            display: "Patient Journal Entry"
          }
        ]
      },
      entry: [
        {
          resource: {
            resourceType: "Observation",
            status: "final",
            category: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                    code: "vital-signs",
                    display: "Vital Signs"
                  }
                ]
              }
            ],
            code: {
              coding: [{ system: "http://loinc.org", code: "8480-6", display: "Systolic Blood Pressure" }]
            },
            subject: { reference: patientId },
            effectiveDateTime: now,
            valueQuantity: { value: parseInt(vitals.systolic), unit: "mmHg" }
          }
        },
        {
          resource: {
            resourceType: "Observation",
            status: "final",
            category: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                    code: "vital-signs",
                    display: "Vital Signs"
                  }
                ]
              }
            ],
            code: {
              coding: [{ system: "http://loinc.org", code: "8462-4", display: "Diastolic Blood Pressure" }]
            },
            subject: { reference: patientId },
            effectiveDateTime: now,
            valueQuantity: { value: parseInt(vitals.diastolic), unit: "mmHg" }
          }
        },
        {
          resource: {
            resourceType: "Observation",
            status: "final",
            category: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                    code: "vital-signs",
                    display: "Vital Signs"
                  }
                ]
              }
            ],
            code: {
              coding: [{ system: "http://loinc.org", code: "8867-4", display: "Heart Rate" }]
            },
            subject: { reference: patientId },
            effectiveDateTime: now,
            valueQuantity: { value: parseInt(vitals.heartRate), unit: "beats/minute" }
          }
        },
        {
          resource: {
            resourceType: "Observation",
            status: "final",
            category: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                    code: "vital-signs",
                    display: "Vital Signs"
                  }
                ]
              }
            ],
            code: {
              coding: [{ system: "http://loinc.org", code: "8310-5", display: "Body Temperature" }]
            },
            subject: { reference: patientId },
            effectiveDateTime: now,
            valueQuantity: { value: parseFloat(vitals.temperature), unit: "°F" }
          }
        },
        {
          resource: {
            resourceType: "Observation",
            status: "final",
            category: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                    code: "survey",
                    display: "Survey"
                  }
                ]
              }
            ],
            code: { text: "Patient Comments" },
            subject: { reference: patientId },
            effectiveDateTime: now,
            valueString: vitals.comments
          }
        }
      ]
    };
  }