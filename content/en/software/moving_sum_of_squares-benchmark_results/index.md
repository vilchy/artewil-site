---
# SPDX-FileCopyrightText: 2023 Artur Wilniewczyc <artur.wilniewczyc@gmail.com>
# SPDX-License-Identifier: CC-BY-SA-4.0

title: "Benchmark results for the moving sum of squares"
type: "software"
translationKey: software_moving_sum_of_squares_benchmark_results
description: "Benchmark results for several implementations of the moving sum of squares."
date: 2023-10-28
chartJS: true
mathJax: true
CCLicense: true
schematype: TechArticle
cover:
  image: moving_sum_of_squares-code.jpg
  relative: true
---

Benchmark results for several implementations of the moving sum of squares (MSS):

* sequential, adapted from [SleepECG](https://github.com/cbrnr/sleepecg/blob/main/sleepecg/heartbeats.py#L280-L331)
  * \\(MSS_{i,k} = MSS_{i-1,k} + x_{i+ \lfloor \frac{k-1}{2} \rfloor }^2 -
                   x_{i - \lfloor \frac{k}{2} \rfloor - 1}^2 \\) ,
  * \\(Work = O(n)\\) ,
  * \\(Span = O(n)\\) ,
* parallel, but work-inefficient relative to the sequential algorithm
  * \\(MSS_{i,k} = \sum_{j=i-\lfloor \frac{k}{2} \rfloor}^{i+ \lfloor \frac{k-1}{2} \rfloor} x_j^2 \\) ,
  * \\(Work = O(n\\,k)\\) ,
  * \\(Span = O(k)\\) ,

where _n_ is signal length, _k_ is window length and \\(0 < k \leq n\\).

The benchmarks were performed on an
[Intel® Core™ i7-12700](https://ark.intel.com/content/www/us/en/ark/products/134591/intel-core-i712700-processor-25m-cache-up-to-4-90-ghz.html)
with 16 GiB of RAM and
[AMD Radeon™ RX 6600 XT](https://www.amd.com/en/products/graphics/amd-radeon-rx-6600-xt).

The source code:

* [codeberg.org/vilchy/moving-sum-of-squares-fut](https://codeberg.org/vilchy/moving-sum-of-squares-fut)
  ([Futhark](https://futhark-lang.org/)),
* [codeberg.org/vilchy/MovingSumOfSquares.jl](https://codeberg.org/vilchy/MovingSumOfSquares.jl)
  ([Julia](https://julialang.org/)),
* [codeberg.org/vilchy/moving-sum-of-squares-mojo](https://codeberg.org/vilchy/moving-sum-of-squares-mojo)
  ([Mojo](https://www.modular.com/mojo)),

## Mean runtime vs. _signal length_ for _window length_ = 32 samples

{{< chart data_id="software/moving_sum_of_squares/runtime_vs_signal_len"
          type="scatter"
          xscale="logarithmic"
          yscale="logarithmic" >}}

{{< benchmark_table data_id="software/moving_sum_of_squares/runtime_vs_signal_len" >}}

## Mean runtime vs. _window length_ for _signal length_ = 50 × 10⁶ samples

{{< chart data_id="software/moving_sum_of_squares/runtime_vs_window_len"
          type="scatter"
          xscale="logarithmic"
          yscale="logarithmic" >}}

{{< benchmark_table data_id="software/moving_sum_of_squares/runtime_vs_window_len" >}}

## Conciseness of the source code

{{< chart data_id="software/moving_sum_of_squares/number_of_tokens"
          type="bar"
          xscale="category"
          yscale="linear" >}}

{{< chart data_id="software/moving_sum_of_squares/compressed_size"
          type="bar"
          xscale="category"
          yscale="linear" >}}

| Implementation | Number of non-whitespace tokens | Compressed size (LZMA) [B] |
|--------------------|----:|----:|
| Futhark sequential | 239 | 395 |
| Futhark parallel   | 103 | 246 |
| Julia sequential   | 160 | 367 |
| Julia parallel     | 120 | 333 |
| Mojo sequential    | 243 | 417 |
| Mojo parallel      | 266 | 537 |
