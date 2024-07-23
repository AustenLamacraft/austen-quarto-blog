---
date: 05/24/2021
slides:
  # Choose a theme from https://github.com/hakimel/reveal.js#theming
  theme: white
  math_renderer: mathjax3
  reveal_options:
    hash: true
scripts: []

---

$$
\DeclareMathOperator*{\E}{\mathbb{E}}
\newcommand{\cE}{\mathcal{E}}
$$

# Machine Learning and Statistical Mechanics

- TCM graduate lectures
- Slides: [austen.uk/slides/ml-stat-mech-1](https://austen.uk/slides/ml-stat-mech-1)
- Text: [austen.uk/post/ml-stat-mech-1](https://austen.uk/post/ml-stat-mech-1)

---

### What do ML and SM have in common?

- Both fields use *probabilistic models* with *large numbers of variables*

- There are theoretical concepts and tools that apply to both

---

### Probability in Statistical Mechanics

- Goal: describe thermodynamic properties of macroscopic system *probabilistically* in terms of microscopic constituents. 


- The probabilistic model is normally the Boltzmann distribution 

$$
p(\mathbf{x})=\frac{\exp\left[-\beta \mathcal{E}(\mathbf{x})\right]}{Z},
$$

- Normalizing constant $Z$ is partition function, $\mathcal{E}(\mathbf{x})$ is the energy of configuration $\mathbf{x}$, and $\beta=1/T$ is inverse temperature

- *Central problem* of SM: computing averages of physical quantities

- *Principle difficulty*: this is hard

---

### Example I: Classical gas

- $\mathbf{x}$ corresponds to positions of each gas molecule: $\mathbf{x}=(\mathbf{x}_1,\ldots \mathbf{x}_N)$ 

- Average is a $3N$-dimensional integral

- Only tractable case: noninteracting (ideal) gas, in which case

$$
\mathcal{E}(\mathbf{x}) = \sum_{n=1}^N \mathcal{E}_1(\mathbf{x}_n)
$$

- If we introduce interactions between particles of the form
$$
\mathcal{E}(\mathbf{x}) = \sum_{n<m}^N \mathcal{E}_2(\mathbf{x}_n,\mathbf{x}_m)
$$
things get a lot harder. 

---

### Example 2: Ising model

- Can also have discrete random variables, e.g. [Ising model](https://en.wikipedia.org/wiki/Ising_model)

- Configuration corresponds to fixing the values of $N$ "spins" $\sigma_n=\pm 1$ with an energy function of the form
$$
\mathcal{E}(\sigma)=\sum_n h_n\sigma_n + \sum_{n,m} J_{mn}\sigma_m\sigma_n.
$$
It's the couplings $J_{mn}$ that causes problems / interest

<!-- The Ising model comes in a great many flavours according to how the fields and couplings are chosen. They may reflect a lattice structure: $J_{mn}\neq 0$ for nearest neighbours, say, or longer range. They may be fixed or random, defining an ensemble of models. You've probably seen lots of examples already. -->

- Worst case:  sum over $2^N$ configurations

- Solve approximately with: mean field theory, Monte Carlo, etc.

---

### Probability in Machine Learning 

- Example: **computer vision**. 

- Image defined by set $(R,G,B)$ values of each pixel each $\in [0,255]$

-  **Basic hypothesis** of probabilistic ML

> Dataset represents a set of independent and identically distributed (**iid**) samples of some random variables. 

- For image, variables are RGB values of pixels

- Distribution has to be highly correlated and have a great deal of complex structure: cats and dogs not white noise

---

### SM *vs.* ML

- Classical SM: motion of molecules deterministic but complicated. Replace with probability model constrained by physics

- ML: (mostly) rely solely on data. **Infer** properties of model. How?

- Recent prgress using models based on NNs + training algorithms

- Allows rich probability models describing images or audio signals

---

### SM *vs.* ML

<p align="center">
<a title="HeMath, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Ising_quench_b10.gif"><img width="400" alt="Ising quench b10" src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Ising_quench_b10.gif"></a>
<video data-autoplay class="stretch" data-src="glow-movie.mp4" width=300></video>
</p>

- __Glow__, Diederik P. Kingma, Prafulla Dhariwal, [arXiv:1807.03039](https://arxiv.org/abs/1807.03039)

---

### Applications of probablistic ML

- Sampling (**generative modelling**). Obvious physics applications
- Density estimation. Anomaly detection
- Compression

---

### This lecture

- Some mathematical background
- Variational inference

---

## Some mathematical background

---

### Probabilities

- Probabilities $p(x)\geq 0$ satisfy

$$
\sum_x p(x)=1
$$

- For continuous variables
$$
\int p(x) dx=1,
$$
but we'll use the discrete notation throughout. 

---

- Joint probabilities denoted $p(x_1,\ldots x_N)$

- Sum over subset to give **marginal distribution** of remaining

$$
p(x)= \sum_{y} p(x,y).
$$

- **Conditional probability** $p(x|y)$: distribution of $x$ given fixed $y$. The relation between joint and conditional probabilities is 

$$
p(x,y)=p(x|y)p(y)
\tag{1}
\label{eq:joint}
$$

---

### [Chain rule of probability](https://en.wikipedia.org/wiki/Chain_rule_(probability))

$$
p(x_1,\ldots x_N)=p(x_1)p(x_2|x_1)p(x_3|x_2,x_1)\cdots p(x_N|x_1,\ldots x_{N-1}),
\tag{2}
\label{eq:chain}
$$

- c.f. [Autoregressive models](https://en.wikipedia.org/wiki/Autoregressive_model)

- Sampling is easy!

---

### Priors and posteriors

- Another way to express the joint probability is

$$
p(x,y)=p(y|x)p(x)
$$

- We deduce [Bayes' theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem)

$$
p(y|x)=\frac{p(x|y)p(y)}{p(x)}
$$

---

### Bayesian statistics 

- Bayes' theorem is workhorse of Bayesian statistics

- Regard parameters $z$ in your probability model as random variables taken from some initial distribution $p(z)$, called the **prior distribution** (or just the **prior**)

---

### Example

- Model distribution is Gaussian normal distribution with mean $\mu$ and variance $\sigma^2$

 - Parameters are $z=(\mu,\sigma^2)$
 
 - For prior could choose a normal distribution: $\mu\sim \mathcal{N}(\mu_\mu,\sigma^2_\mu))$
 
 - For $\sigma^2$ a distribution of a positive quantity: the [inverse gamma distribution](https://en.wikipedia.org/wiki/Inverse-gamma_distribution) is a popular choice. 

---

- Once parameters fixed, have a model distribution for your data that can be thought of as the conditional distribution $p(x|z)$

-  What does an observation of $x$ tell me? Just use Bayes:

$$
p(z|x) = \frac{p(x|z)p(z)}{p(x)}.
$$

- This is the **posterior distribution** (or just **posterior**)

- Note that the denominator doesn't depend on $z$, it just provides a normalization. If you have lots of data points then

$$
p(z|x_1,\ldots x_N) \propto  p(x_1,\ldots x_N|z)p(z).
$$

---

- Bayes' theorem lets us update our beliefs about parameters based on our initial beliefs and any evidence we receive. This is  **inference**.

<!-- This feature of Bayesian statistics has led to a great many "thought leader" types describing themselves as Bayesians even though they wouldn't know their numerators from their denominators. -->

{{< tweet 1325474361407660034 >}}

<!-- In the real world, it's not that easy. You don't actually get the data distribution $p(x)$, but rather samples from it. Also, your model may not be good enough for the task in hand. We'll talk about how we deal with these issues shortly. -->

---

### Latent variables; generative models

- We allow the $z$s to have different distributions for different data points $p(z_n|x_n)$

- Equivalently, our model is defined by a joint distribution $p(x,z)$. 

--- 

### Example: [mixture model](https://en.wikipedia.org/wiki/Mixture_model)

- $M$ different components, each with their own distribution $p(x|m)$ and occurring with probability $p(m)$, so that

$$
p(x) = \sum_m p(m)p(x|m).
$$

- Observation $x$ will give me information about $p(m|x)$, telling which of the $M$ components that observation belongs to. 

- This may bring insight, if latent variables are interpretable

- Or: a more powerful model

---

- Latent variables allow for **structure learning**

 - Example: for a dataset of images of people walking we'd like to find latent variables parameterize a manifold of different poses.

- Latent variable models are also the basis of **generative modelling**: sampling from a distribution $p(x)$ learnt from data. 

- If the model has been formulated in terms of a prior $p(z)$ over latent variables and a generative model $p(x|z)$, sampling is straightforward in principle.

---

### Entropy

- In SM we're familiar with entropy associated with probability distribution. 

- Arrived in ML from information theory

$$
H[p]=- \sum_x p(x)\log_2 p(x).
$$

- Taking the logarithm base 2 means we measure in bits 

---

<!-- There are lots of ways to think about the entropy so I'll just describe one that's quite useful in our setting.  -->
<!-- Suppose we have a $N$ samples from a uniform random distribution on $x$ (so strictly there will have to be a finite number of possible outcomes, but we can always take limits). What's the chance of observing the fractions $p(x)=N_x/N$? The chance of any set of values is just $1/|X|^N$, where $|X|$ is the number of possible outcomes, so to get the probability of the fractions $p(x)$ we multiply by the multinomial coefficient

$$
p(N_1,\ldots N_{|X|})= |X|^{-N}\frac{N!}{\prod_x N_x!}.
$$

Using Stirling's approximation $\log n! \sim n\log n -n$ gives, for large $N$

$$
p(N_1,\ldots N_{|X|})\sim|X|^{-N}2^{-N\sum_x p(x)\log_2 p(x)}=|X|^{-N}2^{NH[p]}.
$$

{{% callout note %}}
To see what $\sim$ means in this context note that when $p(x)=1/|X|$ (uniform distribution) the RHS is one, so this expression is missing a normalization factor (which you can get from a [better Stirling's approximation](https://en.wikipedia.org/wiki/Stirling%27s_approximation)), but that factor is not exponential in $N$, so we drop it.
{{% /callout %}}

 The entropy is therefore a useful measure of **exponentially unlikely events**. If we divide a container of $N$ ideal gas molecules up into $|X|$ identical regions $x=1\,\ldots |X|$, the probability of finding a fraction of gas $p(x)$ in each region is $\propto 2^{NH[p]}$.  -->

### One interpretation of entropy

- $N$ iid variables with distribution $p(x)$

- Probability of observing a sequence $x_1,\ldots x_N$ is

$$
\begin{equation}
p(x_1,\ldots x_N)=\prod_{n=1}^N p(x_n).
\end{equation}
\tag{3}
\label{eq:seq}
$$

- Probability is obviously exponentially small as $N\to\infty$, but how small? 

---

$$
\lim_{N\to\infty} \frac{1}{N}\log p(x_1,\ldots x_N) = -H[p].
$$

- [Asymptotic partition property](https://en.wikipedia.org/wiki/Asymptotic_equipartition_property)

- Shouldn't the probability depend on what you actually get?

- Suppose you have a biased coin that give heads with probability $p_H>0.5$ and tails with probability $p_T=1-p_H$

- Chance of getting half heads and half tails exponentially small

---

- What you're going to get instead is

$$
\frac{N_H}{N}\to p_H\qquad \frac{N_T}{N}\to p_T\qquad .
$$

- What is the probability of such a sequence? $p_H^{N_H}p_T^{N_T}$

$$
\log_2\left(p_H^{N_H}p_T^{N_T}\right)= N_H\log_2 p_H + N_T\log_2 p_T = -N H[p_H, p_T]. 
$$

---

### Entropy and information 

- A way to quantify information in a signal

-  If the coin is *really* biased, you will be surprised when you get tails

- Entropy lower than for fair coin, which has maximum entropy $H=1$

--- 

> HHHHHHHHHHHHHHHHHHHHHTHHHHHHHHHHHHHTHHHHT

- To describe such a sequence, you might say "21 H, 13 H, 4 H"

- Shorter than the original sequence; possible because of the high degree of predictability

- **But**: extra symbols including the digits 0-9 and comma. 

- Should instead compare with a binary code of only two symbols

- How can we exploit the lower entropy of the sequence? 

---

- Use fact that we expect $N_H=Np_H$ heads and $N_T=N p_T$ tails, so we can just give the *ordering* of these heads and tails, which is one of
$$
\frac{N!}{N_H! N_T!}
$$
possibilities. If we label each of these with a binary number, we end up with a description of length
$$
\log_2\left(\frac{N!}{N_H! N_T!}\right)\sim N H[p]\leq N
$$
(where we used Stirling's approximation $\log n! \sim n\log n -n$). 

---

- Simplest illustration of [Shannon's source coding theorem](https://en.wikipedia.org/wiki/Shannon%27s_source_coding_theorem):

> N i.i.d. random variables each with entropy H(X) can be compressed into more than N H(X) bits with negligible risk of information loss, as N → ∞; but conversely, if they are compressed into fewer than N H(X) bits it is virtually certain that information will be lost.

- Shannon's theorem is the core idea that underlies (lossless) data compression

- The more predictable a signal (i.e. the lower the entropy) the more it can be compressed, with the entropy setting a fundamental limit on the number of bits required. 

---



### Divergences

- We need some way of talking about the degree to which two distributions differ

- Most common measure in use in ML is the [Kullback–Leibler divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence) (KL)

$$
D_\text{KL}(p||q)=\sum_x p(x)\log\left(\frac{p(x)}{q(x)}\right)=\E_{x\sim p}\log\left(\frac{p(x)}{q(x)}\right).
$$

---

- KL has property

$$
D_\text{KL}(p||q)\geq 0
$$

- Consequence of [Jensen's inequality](https://en.wikipedia.org/wiki/Jensen%27s_inequality). For a convex function $\varphi(x)$

$$
\E\left[\varphi(x))\right]\geq \varphi\left(\E\left[x\right]\right)
$$

- Apply this to the KL then, using the convexity of $\varphi(x)=-\log(x)$
$$
D_\text{KL}(p||q)=-\E_{x\sim p}\log\left(\frac{q(x)}{p(x)}\right)\geq -\log\left(\E_{x\sim p}\left[\frac{q(x)}{p(x)}\right]\right)=-\log(1)=0,
$$
with equality if and only if $p=q$. 

---

### Variational inference (VI)

- Recall Bayes'

$$
p(z|x) = \frac{p(x|z)p(z)}{p(x)}=\frac{p(x,z)}{p(x)}.
$$

- Complicated latent variable model $\longrightarrow$ intractable denominator

<!-- The problems are

1. We don't actually have $p(x)$, just a dataset that we interpret as providing samples from $p(x)$.

2. If the data is highly structured and complex (keep our images example in mind) then $p(x|z)$ will have to be a similarly complicated model if it's going to have a chance of success. Think of the Ising model with all sorts of nasty couplings and fields. To evaluate $p(x|z)$ we are going to have to calculate the normalization factor aka the partition function $Z$, and that's going to be hard for a big model. -->

---

### Mean field theory

- For SM model like Ising the probability has the form

$$
p(\sigma) = \frac{\exp\left[-\beta\cE(\sigma)\right]}{Z}.
$$

$$
q_\theta(\sigma)=\prod_n q_{\theta_n}(\sigma_n).
$$

- Natural to try to minimize 

$$
D_\text{KL}(q||p)(q||p)=\E_{\sigma\sim q_\theta}\left[\log\left(\frac{q_\theta(\sigma)}{p(\sigma)}\right)\right].
$$

---

- Substituting in the Boltzmann distribution
$$
D_\text{KL}(q||p)(q||p)= \log Z - H[q_\theta] + \beta \E_{\sigma\sim q_\theta}\left[\cE(\sigma)\right]\geq 0,
$$
or in usual SM language
$$
\E_{\sigma\sim q_\theta}\left[\cE(\sigma)\right]-TH[q_\theta] \geq F,
$$
where $F=-T\log Z$ is the Helmholtz free energy. 

- This is the [Bogoliubov](https://en.wikipedia.org/wiki/Helmholtz_free_energy#Bogoliubov_inequality) or [Gibbs](https://en.wikipedia.org/wiki/Gibbs%27_inequality) inequality

--- 

- For Ising spins our factorized distributions are defined by fields on each site
$$
q_{\theta_n}(\sigma_n) = \frac{\exp\left[-\beta\theta_n\sigma_n\right]}{2\cosh (\beta\theta_n)}, 
$$
with average spin
$$
\E_{\sigma_n\sim q_n}\left[\sigma_n\right] = -\tanh\left(\beta\theta_n\right).
$$

---

### VI in latent variable models

- Just need to replace the Boltzmann distribution with
$$
p(z|x) =\frac{p(x,z)}{p_\text{M}(x)}.
$$
(we add the subscript "M" for model) 

- Role of spins $\sigma$ is now played by the latent variables

- Following same steps leads us to 

$$
\log p_\text{M}(x) \geq \E_{z\sim q_\theta(\cdot|x)}\left[\log p(x,z)\right]+ H[q_\theta(\cdot|z)].
$$

---

- RHS is [Evidence lower bound](https://en.wikipedia.org/wiki/Evidence_lower_bound) or **ELBO** (marginalized probability $p(x)$ on the left is sometimes called the **model evidence**). 

- Possible to rewrite as
$$
\log p_\text{M}(x) \geq \log p_\text{M}(x) - D_\text{KL}(q_\theta(\cdot|x)||p(\cdot|x)),
$$
so the bound is saturated when the variational posterior for the latent variables coincides with the true posterior 
$$
p(z|x)=p(x,z)/p_\text{M}(x)
$$
