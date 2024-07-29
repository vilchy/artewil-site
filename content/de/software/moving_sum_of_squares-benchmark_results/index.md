---
# SPDX-FileCopyrightText: 2023-2024 Artur Wilniewczyc <code@artewil.com>
# SPDX-License-Identifier: CC-BY-SA-4.0

title: "Benchmark-Ergebnisse für die gleitende Quadratsumme"
type: "software"
translationKey: software_moving_sum_of_squares_benchmark_results
slug: gleitende_quadratsumme-benchmark-ergebnisse
description: "Benchmark-Ergebnisse für verschiedene Implementierungen der gleitenden Quadratsumme."
date: 2023-10-28
lastmod: 2024-07-29
chartJS: true
mathJax: true
CCLicense: true
schematype: TechArticle
cover:
  image: moving_sum_of_squares-code.jpg
  relative: true
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
  ([Mojo](https://www.modular.com/mojo "|hreflang:en|lang:en")),
* [codeberg.org/vilchy/moving_sum_of_squares_nx](https://codeberg.org/vilchy/moving_sum_of_squares_nx "|hreflang:en|lang:en")
  ([Elixir](https://elixir-lang.org/ "|hreflang:en|lang:en")).

## Durchschnittliche Laufzeit für verschiedene _Signallängen_ und _Fensterlänge_ = 32 Abtastwerte

### Sequentiell

{{< chart data_id="software/moving_sum_of_squares/runtime_vs_signal_len_seq"
          type="scatter"
          xscale="logarithmic"
          yscale="logarithmic" >}}

{{< benchmark_table data_id="software/moving_sum_of_squares/runtime_vs_signal_len_seq" >}}

### Parallel

{{< chart data_id="software/moving_sum_of_squares/runtime_vs_signal_len_par"
          type="scatter"
          xscale="logarithmic"
          yscale="logarithmic" >}}

{{< benchmark_table data_id="software/moving_sum_of_squares/runtime_vs_signal_len_par" >}}

## Durchschnittliche Laufzeit für verschiedene _Fensterlängen_ und _Signallänge_ = 50⋅10⁶ Abtastwerte

### Sequentiell

{{< chart data_id="software/moving_sum_of_squares/runtime_vs_window_len_seq"
          type="scatter"
          xscale="logarithmic"
          yscale="logarithmic" >}}

{{< benchmark_table data_id="software/moving_sum_of_squares/runtime_vs_window_len_seq" >}}

### Parallel

{{< chart data_id="software/moving_sum_of_squares/runtime_vs_window_len_par"
          type="scatter"
          xscale="logarithmic"
          yscale="logarithmic" >}}

{{< benchmark_table data_id="software/moving_sum_of_squares/runtime_vs_window_len_par" >}}

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
|-----------------------|----:|----:|
| Futhark sequentiell   | 283 | 439 |
| Futhark parallel      | 109 | 266 |
| Julia sequentiell     | 214 | 486 |
| Julia parallel        | 132 | 409 |
| Mojo sequentiell      | 371 | 585 |
| Mojo parallel         | 249 | 540 |
| Elixir+Nx sequentiell | 431 | 713 |
| Elixir+Nx parallel    | 145 | 424 |
