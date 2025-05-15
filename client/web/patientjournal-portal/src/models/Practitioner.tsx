export interface FHIRMeta {
    versionId?: string;
    lastUpdated?: string;
  }
  
  export interface FHIRHumanName {
    use?: string;
    text?: string;
    family?: string;
    given?: string[];
  }
  
  export interface Practitioner {
    resourceType: 'Practitioner';
    id: string;
    name?: FHIRHumanName[];
    meta?: FHIRMeta;
  }
  