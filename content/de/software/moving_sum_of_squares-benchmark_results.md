---
# SPDX-FileCopyrightText: 2023 Artur Wilniewczyc <artur.wilniewczyc@gmail.com>
# SPDX-License-Identifier: CC-BY-SA-4.0

title: "Benchmark-Ergebnisse für die gleitende Quadratsumme"
type: "software"
translationKey: software_moving_sum_of_squares_benchmark_results
slug: gleitende_quadratsumme-benchmark-ergebnisse
description: "Benchmark-Ergebnisse für verschiedene Implementierungen der gleitenden Quadratsumme."
date: 2023-10-28
chartJS: true
mathJax: true
CCLicense: true
---

Benchmark-Ergebnisse für verschiedene Implementierungen der gleitenden Quadratsumme (MSS):

* sequentiell, basierend auf dem Code von [SleepECG](https://github.com/cbrnr/sleepecg/blob/main/sleepecg/heartbeats.py#L280-L331 "|hreflang:en|lang:en")
  * \\(MSS_{i,k} = MSS_{i-1,k} + x_{i+ \lfloor \frac{k-1}{2} \rfloor }^2 -
                   x_{i - \lfloor \frac{k}{2} \rfloor - 1}^2 \\) ,
  * \\(Work = O(n)\\) ,
  * \\(Span = O(n)\\) ,
* parallel, aber ineffizient im Vergleich zum sequentiellen Algorithmus
  * \\(MSS_{i,k} = \sum_{j=i-\lfloor \frac{k}{2} \rfloor}^{i+ \lfloor \frac{k-1}{2} \rfloor} x_j^2 \\) ,
  * \\(Work = O(n\\,k)\\) ,
  * \\(Span = O(k)\\) ,

wobei _n_ die Signallänge, _k_ die Fensterlänge und \\(0 < k \leq n\\) ist.

Die Benchmarks wurden auf einem
[Intel® Core™ i7-12700](https://ark.intel.com/content/www/de/de/ark/products/134591/intel-core-i712700-processor-25m-cache-up-to-4-90-ghz.html)
mit 16 GiB RAM und
[AMD Radeon™ RX 6600 XT](https://www.amd.com/de/products/graphics/amd-radeon-rx-6600-xt) durchgeführt.

Der Quellcode:

* [codeberg.org/vilchy/moving-sum-of-squares-fut](https://codeberg.org/vilchy/moving-sum-of-squares-fut "|hreflang:en|lang:en")
  ([Futhark](https://futhark-lang.org/ "|hreflang:en|lang:en")),
* [codeberg.org/vilchy/MovingSumOfSquares.jl](https://codeberg.org/vilchy/MovingSumOfSquares.jl "|hreflang:en|lang:en")
  ([Julia](https://julialang.org/ "|hreflang:en|lang:en")),
* [codeberg.org/vilchy/moving-sum-of-squares-mojo](https://codeberg.org/vilchy/moving-sum-of-squares-mojo "|hreflang:en|lang:en")
  ([Mojo](https://www.modular.com/mojo "|hreflang:en|lang:en")).

## Durchschnittliche Laufzeit für verschiedene _Signallängen_ und _Fensterlänge_ = 32 Abtastwerte

{{< chart data_id="software/moving_sum_of_squares/runtime_vs_signal_len"
          type="scatter"
          xscale="logarithmic"
          yscale="logarithmic" >}}

{{< benchmark_table data_id="software/moving_sum_of_squares/runtime_vs_signal_len" >}}

## Durchschnittliche Laufzeit für verschiedene _Fensterlängen_ und _Signallänge_ = 50⋅10⁶ Abtastwerte

{{< chart data_id="software/moving_sum_of_squares/runtime_vs_window_len"
          type="scatter"
          xscale="logarithmic"
          yscale="logarithmic" >}}

{{< benchmark_table data_id="software/moving_sum_of_squares/runtime_vs_window_len" >}}

## Prägnanz des Quellcodes

{{< chart data_id="software/moving_sum_of_squares/number_of_tokens"
          type="bar"
          xscale="category"
          yscale="linear" >}}

{{< chart data_id="software/moving_sum_of_squares/compressed_size"
          type="bar"
          xscale="category"
          yscale="linear" >}}

| Implementierung | Anzahl der Token ohne Leerzeichen | Komprimierte Größe (LZMA) [B] |
|---------------------|----:|----:|
| Futhark sequentiell | 239 | 395 |
| Futhark parallel    | 103 | 246 |
| Julia sequentiell   | 160 | 367 |
| Julia parallel      | 120 | 333 |
| Mojo sequentiell    | 243 | 417 |
| Mojo parallel       | 266 | 537 |
