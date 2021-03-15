import { getConfigYaml, writeConfigToFile } from "./utils";
import {
  Config,
  Variables,
  Need,
  Rule,
  Job,
  Artifacts,
  Image,
  Include,
} from "./interfaces";

export { Config, Variables, Need, Rule, Job, Artifacts, Image, Include };

export const createConfig = <Stages, JobNames>(
  config: Config<Stages, JobNames>,
  outputFile?: string
): string => {
  const configYml = getConfigYaml(config);
  if (!outputFile) return configYml;

  writeConfigToFile(configYml, outputFile);
  return configYml;
};
