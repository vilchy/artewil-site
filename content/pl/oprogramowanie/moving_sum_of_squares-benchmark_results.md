---
# SPDX-FileCopyrightText: 2023 Artur Wilniewczyc <artur.wilniewczyc@gmail.com>
# SPDX-License-Identifier: CC-BY-SA-4.0

title: "Wyniki benchmarków sumy kroczącej kwadratów"
type: "software"
description: "Wyniki benchmarków kilku implementacji sumy kroczącej kwadratów."
url: oprogramowanie/suma_kroczaca_kwadratow-wyniki_benchmarkow
translationKey: software_moving_sum_of_squares_benchmark_results
date: 2023-10-28
chartJS: true
mathJax: true
CCLicense: true
schematype: TechArticle
---

Wyniki benchmarków kilku implementacji sumy kroczącej kwadratów (MSS):

* algorytm szeregowy, na podstawie funkcji z [SleepECG](https://github.com/cbrnr/sleepecg/blob/main/sleepecg/heartbeats.py#L280-L331 "|hreflang:en|lang:en")
  * \\(MSS_{i,k} = MSS_{i-1,k} + x_{i+ \lfloor \frac{k-1}{2} \rfloor }^2 -
                   x_{i - \lfloor \frac{k}{2} \rfloor - 1}^2 \\) ,
  * \\(Work = O(n)\\) ,
  * \\(Span = O(n)\\) ,
* algorytm równoległy, ale nieefektywny względem algorytmu szeregowego
  * \\(MSS_{i,k} = \sum_{j=i-\lfloor \frac{k}{2} \rfloor}^{i+ \lfloor \frac{k-1}{2} \rfloor} x_j^2 \\) ,
  * \\(Work = O(n\\,k)\\) ,
  * \\(Span = O(k)\\) ,

gdzie _n_ to długość sygnału, _k_ – długość okna i \\(0 < k \leq n\\).

Benchmarki wykonano na
[Intel® Core™ i7-12700](https://ark.intel.com/content/www/us/en/ark/products/134591/intel-core-i712700-processor-25m-cache-up-to-4-90-ghz.html "|hreflang:en|lang:en")
z 16 GiB RAM-u i
[AMD Radeon™ RX 6600 XT](https://www.amd.com/en/products/graphics/amd-radeon-rx-6600-xt "|hreflang:en|lang:en").

Kod źródłowy:

* [codeberg.org/vilchy/moving-sum-of-squares-fut](https://codeberg.org/vilchy/moving-sum-of-squares-fut "|hreflang:en|lang:en")
  ([Futhark](https://futhark-lang.org/ "|hreflang:en|lang:en")),
* [codeberg.org/vilchy/MovingSumOfSquares.jl](https://codeberg.org/vilchy/MovingSumOfSquares.jl "|hreflang:en|lang:en")
  ([Julia](https://julialang.org/ "|hreflang:en|lang:en")),
* [codeberg.org/vilchy/moving-sum-of-squares-mojo](https://codeberg.org/vilchy/moving-sum-of-squares-mojo "|hreflang:en|lang:en")
  ([Mojo](https://www.modular.com/mojo "|hreflang:en|lang:en")).

## Średni czas wykonania w zależności od długości sygnału dla okna o długości 32 próbek

{{< chart data_id="software/moving_sum_of_squares/runtime_vs_signal_len"
          type="scatter"
          xscale="logarithmic"
          yscale="logarithmic" >}}

{{< benchmark_table data_id="software/moving_sum_of_squares/runtime_vs_signal_len" >}}

## Średni czas wykonania w zależności od długości okna dla sygnału o długości 50⋅10⁶ próbek

{{< chart data_id="software/moving_sum_of_squares/runtime_vs_window_len"
          type="scatter"
          xscale="logarithmic"
          yscale="logarithmic" >}}

{{< benchmark_table data_id="software/moving_sum_of_squares/runtime_vs_window_len" >}}

## Zwięzłość kodu źródłowego

{{< chart data_id="software/moving_sum_of_squares/number_of_tokens"
          type="bar"
          xscale="category"
          yscale="linear" >}}

{{< chart data_id="software/moving_sum_of_squares/compressed_size"
          type="bar"
          xscale="category"
          yscale="linear" >}}

| Implementacja | Liczba tokenów bez białych znaków | Rozmiar po skompresowaniu (LZMA) [B] |
|--------------------|----:|----:|
| Futhark szeregowy  | 239 | 395 |
| Futhark równoległy | 103 | 246 |
| Julia szeregowy    | 160 | 367 |
| Julia równoległy   | 120 | 333 |
| Mojo szeregowy     | 243 | 417 |
| Mojo równoległy    | 266 | 537 |
