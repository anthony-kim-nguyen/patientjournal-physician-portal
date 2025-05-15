export function buildSymptomsBundle(
    symptoms: Record<string, number>,
    questions: { linkId: string; text?: string }[],
    patientId: string,
    dateTime: string
  ) {
    return {
      resourceType: "Bundle",
      type: "collection",
      meta: {
        tag: [
          {
            system: "http://example.org/fhir/tags",
            code: "journal-entry",
            display: "Patient Journal Entry"
          },
          {
            system: "http://example.org/fhir/tags",
            code: "symptoms",
            display: "Symptom Entry"
          }
        ]
      },
      entry: Object.entries(symptoms).map(([linkId, value]) => {
        const question = questions.find(q => q.linkId === linkId);
        return {
          resource: {
            resourceType: "Observation",
            status: "final",
            category: [{
              coding: [{
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "survey",
                display: "Survey"
              }]
            }],
            code: {
              coding: [{
                system: "http://example.org/fhir/symptoms",
                code: linkId,
                display: question?.text ?? linkId
              }],
              text: question?.text ?? linkId
            },
            subject: {
              reference: patientId
            },
            effectiveDateTime: dateTime,
            valueQuantity: {
              value: value,
              unit: "score"
            },
            meta: {
              tag: [
                {
                  system: "http://example.org/fhir/tags",
                  code: "journal-entry",
                  display: "Journal Entry"
                },
                {
                  system: "http://example.org/fhir/tags",
                  code: "symptoms",
                  display: "Symptom Entry"
                }
              ]
            }
          }
        };
      })
    };
  }
  