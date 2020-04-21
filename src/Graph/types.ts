import { AreaChartProps, BarChartProps } from 'recharts';

interface IBarGraph {
    items?: Array<{ title: string; key: string }>;
}

export type BarGraphProps = IBarGraph & BarChartProps;

interface IAreaGraph {
    items?: Array<{ title: string; key: string }>;
}

export type AreaGraphProps = IAreaGraph & AreaChartProps;
