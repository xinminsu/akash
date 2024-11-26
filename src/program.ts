import { Command } from 'commander';

const program = new Command();

let models: string = `1. Meta-Llama-3-1-8B-Instruct-FP8
                        2. Meta-Llama-3-1-405B-Instruct-FP8
                        3. Meta-Llama-3-2-3B-Instruct
                        4. nvidia-Llama-3-1-Nemotron-70B-Instruct-HF`;

program
  .version("0.0.1")
  .description("An akash ai CLI ")
  .option("-m, --model <value>", `select a model: 
                        ${models}`)
  .parse(process.argv);

const options = program.opts();

let modelName : string = '';

if (Object.keys(options).length === 0 ) {
    console.log("no model name selected, should add -h at the command end to see help")
    process.exit(1);
}

switch (options.model) {
    case "1": 
      modelName = "Meta-Llama-3-1-8B-Instruct-FP8";
      break;
    case "2":
      modelName = "Meta-Llama-3-1-405B-Instruct-FP8";
      break;
    case "3":
      modelName = "Meta-Llama-3-2-3B-Instruct";
      break;
    case "4":
      modelName = "nvidia-Llama-3-1-Nemotron-70B-Instruct-HF";
      break;      
    default: throw "invalid, no modelName selected, should be 1-4 number"
}

export default modelName;