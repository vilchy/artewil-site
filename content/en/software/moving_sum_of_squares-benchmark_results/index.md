---
# SPDX-FileCopyrightText: 2023-2024 Artur Wilniewczyc <code@artewil.com>
# SPDX-License-Identifier: CC-BY-SA-4.0

title: "Benchmark results for the moving sum of squares"
type: "software"
translationKey: software_moving_sum_of_squares_benchmark_results
description: "Benchmark results for several implementations of the moving sum of squares."
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

The source code:

* [codeberg.org/vilchy/moving-sum-of-squares-fut](https://codeberg.org/vilchy/moving-sum-of-squares-fut)
  ([Futhark](https://futhark-lang.org/)),
* [codeberg.org/vilchy/MovingSumOfSquares.jl](https://codeberg.org/vilchy/MovingSumOfSquares.jl)
  ([Julia](https://julialang.org/)),
* [codeberg.org/vilchy/moving-sum-of-squares-mojo](https://codeberg.org/vilchy/moving-sum-of-squares-mojo)
  ([Mojo](https://www.modular.com/mojo)),
* [codeberg.org/vilchy/moving_sum_of_squares_nx](https://codeberg.org/vilchy/moving_sum_of_squares_nx)
  ([Elixir](https://elixir-lang.org/)).

The benchmarks were performed on an
[Intel® Core™ i7-12700](https://ark.intel.com/content/www/us/en/ark/products/134591/intel-core-i712700-processor-25m-cache-up-to-4-90-ghz.html)
with 16 GiB of RAM and
[AMD Radeon™ RX 6600 XT](https://www.amd.com/en/products/graphics/amd-radeon-rx-6600-xt).

* Futhark: 0.25.4. Backends:
  [C](https://futhark.readthedocs.io/en/stable/man/futhark-c.html),
  [Multicore](https://futhark.readthedocs.io/en/stable/man/futhark-multicore.html),
  [OpenCL](https://futhark.readthedocs.io/en/stable/man/futhark-opencl.html) (GPU).
* Julia: 1.9.2.
* Mojo: 24.3.
* Elixir: 1.16.2. Erlang: 26.2.5.
  Backend: [EXLA](https://hexdocs.pm/exla/EXLA.html) (CPU, JIT).

## Mean runtime vs. _signal length_ for _window length_ = 32 samples

### Sequential

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

## Mean runtime vs. _window length_ for _signal length_ = 50 × 10⁶ samples

### Sequential

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
|----------------------|----:|----:|
| Futhark sequential   | 283 | 439 |
| Futhark parallel     | 109 | 266 |
| Julia sequential     | 214 | 486 |
| Julia parallel       | 132 | 409 |
| Mojo sequential      | 371 | 585 |
| Mojo parallel        | 249 | 540 |
| Elixir+Nx sequential | 431 | 713 |
| Elixir+Nx parallel   | 145 | 424 |
