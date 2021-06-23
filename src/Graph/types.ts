import { AreaChartProps, BarChartProps } from 'recharts';

interface IBarGraph {
    items?: Array<{ title: string; key: string }>;

    // array of colors to override defaults on a per-graph basis
    colorOverride?: Array<string>;
}

export type BarGraphProps = IBarGraph & BarChartProps;

interface IAreaGraph {
    items?: Array<{ title: string; key: string }>;
    basic?: boolean;

    // array of colors to override defaults on a per-graph basis
    colorOverride?: Array<string>;
}

export type AreaGraphProps = IAreaGraph & AreaChartProps;
