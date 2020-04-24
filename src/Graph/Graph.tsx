import React from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { useWindowResize } from '../hooks/useWindowResize';
import { Text } from '../Text';
import useGraphStyle from './styles';
import { AreaGraphProps, BarGraphProps } from './types';

const CustomTooltip = ({ active = null, payload = null, label = null, items }) => {
    if (active) {
        return (
            <Box bg="cardBg" boxShadow="menu" p={3}>
                <Heading kind="h6">{payload && payload[0].payload.name}</Heading>
                {items.map((item, index) => {
                    return <Text key={item.key}>{`${item.title}: ${payload && payload[index].value}`}</Text>;
                })}
            </Box>
        );
    }

    return null;
};

const renderLegendText = (value, entry, index, items) => {
    return <Text d="inline-block">{items[index]?.title}</Text>;
};

export const BarGraph = ({ data, items = [], height = 300, ...props }: BarGraphProps) => {
    const {
        root: rootStyleProps,
        graph: graphStyle,
        legend: legendStyleProps,
        axis: axisStyleProps,
        colors,
    } = useGraphStyle({
        variant: 'bar',
    });

    return (
        <ResponsiveContainer height={height}>
            <BarChart data={data} {...rootStyleProps} {...props}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" {...axisStyleProps} />
                <YAxis {...axisStyleProps} />
                <Tooltip content={<CustomTooltip items={items} />} />
                <Legend
                    formatter={(value, entry, index) => renderLegendText(value, entry, index, items)}
                    {...legendStyleProps}
                />
                {items.map((item, index) => (
                    <Bar dataKey={item.key} key={item.key} fill={colors[index % colors.length]} {...graphStyle} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export const AreaGraph = ({ data, items = [], height = 300, ...props }: AreaGraphProps) => {
    const { windowWidth } = useWindowResize();
    const {
        root: rootStyleProps,
        graph: graphStyle,
        legend: legendStyleProps,
        axis: axisStyleProps,
        colors,
    } = useGraphStyle({
        variant: 'area',
    });

    return (
        <ResponsiveContainer width="99%" height={height} debounce={1}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} {...rootStyleProps} {...props}>
                <defs>
                    {items.map((item, index) => {
                        const color = colors[index % colors.length];
                        return (
                            <linearGradient id={`colorUv_${item.key}`} key={item.key} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                                <stop offset="95%" stopColor={color} stopOpacity={0.04} />
                            </linearGradient>
                        );
                    })}
                </defs>
                <XAxis dataKey="name" {...axisStyleProps} />
                <YAxis {...axisStyleProps} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip content={<CustomTooltip items={items} />} />
                <Legend
                    formatter={(value, entry, index) => renderLegendText(value, entry, index, items)}
                    {...legendStyleProps}
                />
                {items.map((item, index) => {
                    const color = colors[index % colors.length];
                    return (
                        <Area
                            dataKey={item.key}
                            key={item.key}
                            stroke={color}
                            fill={`url(#colorUv_${item.key})`}
                            {...graphStyle}
                            dot={{
                                ...graphStyle.dot,
                                stroke: color,
                            }}
                        />
                    );
                })}
            </AreaChart>
        </ResponsiveContainer>
    );
};
