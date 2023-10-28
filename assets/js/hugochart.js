/*
 * SPDX-FileCopyrightText: 2023 Artur Wilniewczyc <artur.wilniewczyc@gmail.com>
 * SPDX-License-Identifier: MIT
*/
const initChart = function (dataText, elementId, type, lang, xscale, yscale) {
    const data = JSON.parse(dataText);
    const pluralRules = new Intl.PluralRules(lang);

    const formatNumberAndUnit = (val, unit, options) => {
        const formatVal = Intl.NumberFormat(lang, options).format;
        let unitStr;
        if (typeof unit === 'string') {
            unitStr = unit;
        } else {
            unitStr = unit[lang][pluralRules.select(val)];
        }
        return `${formatVal(val)} ${unitStr}`
    }

    let chartData, ticksOptions = {}, tooltipOptions = {};
    if (type === 'scatter') {
        chartData = {
            datasets: data.y.datasets.map((dataset) => ({
                label: dataset.label[lang],
                pointStyle: dataset.point_style,
                pointRadius: 6,
                data: data.x.values.map((x, i) => ({
                    x: x, y: dataset.values[i]
                }))
            }))
        };
        ticksOptions = { callback: Intl.NumberFormat(lang).format };
        tooltipOptions = {
            callbacks: {
                label: (context) => {
                    const x = formatNumberAndUnit(context.parsed.x, data.x.unit);
                    const y = formatNumberAndUnit(
                        context.parsed.y,
                        data.y.unit,
                        { minimumSignificantDigits: 2, maximumSignificantDigits: 2 }
                    );
                    return `${context.dataset.label}: (${x}, ${y})`;
                }
            }
        };
    } else {
        chartData = {
            labels: data.x.values,
            datasets: data.y.datasets.map((dataset) => ({
                label: dataset.label[lang],
                data: dataset.values,
            }))
        }
    }

    new Chart(
        document.getElementById(elementId),
        {
            type: type,
            options: {
                animation: false,
                aspectRatio: type === 'scatter' ? 1 : 2,
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: type === 'scatter',
                        },
                        title: {
                            display: typeof data.title !== "undefined",
                            font: {
                                size: 16,
                                weight: 'bold',
                            },
                            text: data.title && data.title[lang]
                        },
                    },
                    tooltip: tooltipOptions,
                },
                scales: {
                    x: {
                        ticks: ticksOptions,
                        title: {
                            display: true,
                            text: data.x.label[lang],
                        },
                        type: xscale,
                    },
                    y: {
                        ticks: ticksOptions,
                        title: {
                            display: true,
                            text: data.y.label[lang],
                        },
                        type: yscale,
                    }
                }
            },
            data: chartData,
        }
    );
}
