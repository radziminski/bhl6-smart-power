export interface ISimIteration {
  accumulator: number;
  clouding: number;
  curr_temp: number;
  net_cost: number;
  net_power_used: number;
  outside_temp: number;
  mode: 1 | 2 | 3 | 4;
}

export interface IWeatherDay {
  clouds: number;
  temperature: number;
  time: number;
}
