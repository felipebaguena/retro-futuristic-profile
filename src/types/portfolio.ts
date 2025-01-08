export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  repository: {
    main?: string;
    frontend?: string;
    backend?: string;
  };
  details: {
    features: string[];
    stack?: {
      frontend?: string[];
      backend?: string[];
    };
  };
}
