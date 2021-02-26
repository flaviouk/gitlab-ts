// https://docs.gitlab.com/ee/ci/yaml/

export interface Config<Stages = string, JobNames = string> {
  image?: Image;
  variables?: Variables;
  stages: Stages[];
  include?: {
    local?: string;
    project?: string;
    file?: string;
    ref?: string;
  }[];
  jobs: Job<Stages, JobNames>[];
}

export interface Variables {
  [name: string]: string | number;
}

export interface Need<JobNames = string> {
  job: JobNames;
  artifacts?: boolean;
  ref?: string;
  project?: string;
}

export interface Rule {
  if: string;
  when?: "on_success" | "delayed" | "always" | "manual" | "never";
  allow_failure?: boolean;
}

export type Image = string | { name: string; entrypoint: string };

export interface Job<Stages = string, JobNames = string> {
  name: JobNames;
  stage: Stages;
  variables?: Variables;
  extends?: string[];
  image?: Image;
  services?:
    | string[]
    | { name: string; alias?: string; entrypoint?: string; command?: string };
  before_script?: string[];
  script: string[];
  after_script?: string[];
  needs?: Need<JobNames>[];
  allow_failure?: boolean | { exit_codes: number[] };
  when?:
    | "on_success"
    | "on_failure"
    | "always"
    | "manual"
    | "delayed"
    | "never";
  start_in?: string;
  rules?: Rule[];
  tags?: string[];
  timeout?: string;
  parallel?: number | { matrix: { PROVIDER: string; stack?: string[] }[] };
  interruptible?: boolean;
  resource_group?: string;
  trigger?: {
    include: {
      local?: string;
      template?: string;
      artifact?: string;
      job?: JobNames;
    };
    strategy?: "depend";
  };
  environment?: {
    name: string;
    url: string;
    on_stop?: string;
    auto_stop_in?: string;
  };
  cache?: {
    key: string;
    policy: "pull-push" | "pull";
    paths: string[];
  };
  artifacts?: Artifacts;
  retry?: {
    max: number;
    when:
      | "always"
      | "unknown_failure"
      | "script_failure"
      | "api_failure"
      | "stuck_or_timeout_failure"
      | "runner_system_failure"
      | "missing_dependency_failure"
      | "runner_unsupported"
      | "stale_schedule"
      | "job_execution_timeout"
      | "archived_failure"
      | "unmet_prerequisites"
      | "scheduler_failure"
      | "data_integrity_failure";
  };
  release?: {
    tag_name: string;
    description: string;
    name?: string;
    ref?: string;
    milestones?: string[];
    released_at?: string;
  };
}

// https://docs.gitlab.com/ee/ci/yaml/#artifacts
export interface Artifacts {
  paths: string[];
  exclude?: string[];
  expose_as?: string;
  name?: string;
  untracked?: boolean;
  when: "on_success" | "on_failure" | "always";
  expire_in?: string;
  reports?: {
    junit?: string[];
    dotenv?: string[];
    cobertura?: string[];
    terraform?: string[];
    codequality?: string[];
    sast?: string[];
    secret_detection?: string[];
    dependency_scanning?: string[];
    container_scanning?: string[];
    dast?: string[];
    license_management?: string[];
    license_scanning?: string[];
    performance?: string[];
    load_performance?: string[];
    metrics?: string[];
    requirements?: string[];
  };
}
