/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type RelineGraphsSchema = RelineGraphSchema[];

export interface RelineGraphSchema {
  id: string;
  metadata: {
    basic: {
      id: string;
      RelineGraphName?: string;
      description?: string;
      keywords?: string[];
      repositories?: {
        type?: string;
        url?: string;
        [k: string]: unknown;
      };
      license?: string;
      version?: string;
      contributors?: {
        name?: string;
        email?: string;
        description?: string;
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    };
    [k: string]: {
      [k: string]: unknown;
    };
  };
  nodes: {
    [k: string]: RelineNodeSchema;
  };
  edges: RelineEdgeSchema[];
}
export interface RelineNodeSchema {
  id: string;
  metadata: {
    basic: {
      id: string;
      [k: string]: unknown;
    };
    [k: string]: {
      [k: string]: unknown;
    };
  };
  [k: string]: unknown;
}
export interface RelineEdgeSchema {
  id: string;
  source: string;
  target: string;
  metadata: {
    basic: {
      id: string;
      label?: string;
      [k: string]: unknown;
    };
    [k: string]: {
      [k: string]: unknown;
    };
  };
}
