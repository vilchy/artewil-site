/*!
 * SPDX-FileCopyrightText: 2023-2024 Artur Wilniewczyc <code@artewil.com>
 * SPDX-License-Identifier: MIT
*/
(function () {
    const initChart = function (el) {
        const data = JSON.parse(el.dataset.chartData);
        const lang = el.dataset.lang;
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

        const type = el.dataset.chartType;
        let chartData, ticksOptions = {}, tooltipOptions = {};
        if (type === 'scatter') {
            chartData = {
                datasets: data.y.datasets.map((dataset) => ({
                    label: dataset.label[lang] || dataset.label,
                    pointStyle: dataset.point_style,
                    pointRadius: 6,
                    backgroundColor: dataset.point_color,
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
            el,
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
                            type: el.dataset.chartXScale,
                        },
                        y: {
                            ticks: ticksOptions,
                            title: {
                                display: true,
                                text: data.y.label[lang],
                            },
                            type: el.dataset.chartYScale,
                        }
                    }
                },
                data: chartData,
            }
        );
    };
    document.addEventListener("DOMContentLoaded", (event) => {
        [...document.getElementsByClassName("chart")].forEach((el) => initChart(el))
    });
})();
