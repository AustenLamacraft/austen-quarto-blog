---
# See all reveal options
# https://quarto.org/docs/reference/formats/presentations/revealjs.html
# E to toggle to PDF mode
title: |
    Many Body Dynamics in Quantum Circuits
subtitle: |
  Lecture at "QUANT26: Quantum Dynamics - Fundamentals and Realizations"

  MPIPKS Dresden
author: "Austen Lamacraft"
date: 09/11/2026
date-format: long
# institute: University of Cambridge
format:
  revealjs:
    theme: [default, reveal_custom.scss]
    slide-number: true
    hash: true
    center: true
    auto-stretch: false
    html-math-method: katex
    preview-links: true
    katex: {
      macros: {
        "\\abs" : "\\left|#1\\right|",
        "\\tr" : "\\operatorname{tr}",
        "\\sgn" : "\\operatorname{sgn}",
      },
      throwOnError: false,
    }
---

# Big idea...

- Fundamental problem of quantum dynamics
$$
i\frac{\partial}{dt}\ket{\Psi} = H\ket{\Psi}
$$
...given some initial $\ket{\Psi_0}$

- As number of components $N$ increases, dimensionality of $\ket{\Psi}$ grows exponentially

- What are the _qualitative_ features of quantum many-body dynamics?

## Experimental systems

Google quantum computer

Willow stats

# Outline

Cite Pieter's review...

- Fundamentals
    - Based on my computational physics notes 
    - Linear algebra background
    - Basics of many body qm (qubits)
    - Bell states
    - Schmidt decomposition
    - Relevance of isometries

- Gates

Based on earlier lectures

- Basic kinds

-  Tensor networks

- Intro to Penrose notation

- Circuits

    - Connection to Floquet physics
    - Appearance of light cone. Connect to folded transfer matrix of Mari-Carmen
    - Folded picture
    - Importance of unitarity (example of measurement induced entanglement)

- Operators spreading. OTOCs

- Representation of correlation functions
- Idea of random circuits and simplest examples of resulting Markov chain

# Fundamentals


## What is a quantum circuit?

- A way to describe operations on quantum state, usually consisting of several __qubits__ (spin 1/2 subsystems with Hilbert space $\mathbb{C}^2$)

- Two quantum states $\ket{0}$ and $\ket{1}$  define the **computational basis**.

<p align="center">
<img src="assets/Reversible_circuit_composition.svg.png" width="15%">
</p>

- $f$ acts on top five qubits, then $g$ acts on lower seven

---

## [Possible operations](https://en.wikipedia.org/wiki/Quantum_logic_gate)

<figure align="center">
<img src="assets/Quantum_teleportation_circuit.svg.png" width="80%">
<figcaption>Source: <a href="https://en.wikipedia.org/wiki/Quantum_circuit">Wikipedia</a> </figcaption>
</figure>

1. $H$ (a [Hadamard gate](https://en.wikipedia.org/wiki/Quantum_logic_gate#Hadamard_gate)) is a __single qubit unitary__ 

2. Also __two qubit unitary gates__ (CNOT here)

3. Measurements 

---

## Why consider circuits?

- __For this program:__ example of discrete time, many body dynamics

- Model of universal quantum computation 
  - How to generate an arbitrary quantum state
  - One of several options e.g. measurement-based

- _They exist!_ Companies (Google, IBM, etc.) have built platforms for gate-based QC

--- 

## Unitary circuits

- (Mostly) concerned with __unitary circuits__ made from __unitary gates__

- Gate is $n$-qubit unitary $U_{s_1\ldots s_n,s'_1,\ldots, s'_n}$

$$
\sum_{s_1'\ldots s_N'}U_{s_1\ldots s_n,s'_1,\ldots, s'_n} U^\dagger_{s'_1\ldots s'_n,s''_1,\ldots, s''_n}=\delta_{s_1,s_1''}\ldots \delta_{s_N,s_N''}
$$


---

## Everything is a tensor

- State of $N$ qubits expressed in product basis
  
$$
\ket{\Psi} = \sum_{s_{1:N}\in \{0,1\}^N} \Psi_{s_1\ldots s_N}\ket{s_1}_1\ket{s_2}_2\cdots \ket{s_N}_N
$$

- Write $\ket{s_1}_1\ket{s_2}_2\cdots \ket{s_N}_N =\ket{s_1\cdots s_N}=\ket{s_{1:N}}$ for brevity 

- Operator on $N$ qubits has matrix elements

$$
\mathcal{O}_{s_{1:N},s'_{1:N}} = \bra{s_{1:N}}\mathcal{O}\ket{s'_{1:N}}
$$

---


## Graphical notation

- A tensor is denoted by a blob with one leg for each index

- Connecting legs denotes contraction: summing over a shared index

<figure align="center">
<img src="assets/contractions.png" width="100%">
<figcaption>See <a href="https://www.tensors.net/tutorial-1">Glen Evenbly's tensor contraction tutorial</a> </figcaption>
</figure>

---

# Gates

## Unitary gates: one qubit

- Multiplication by a Pauli matrix: $X$, $Y$, or $Z$.

- General case $U = a_0\mathbb{1} + \mathbf{a}\cdot(X,Y,Z)$ with $|a_0|^2+|\mathbf{a}|^2=1$

- Other special cases used in quantum information e.g. [Hadamard gate](https://en.wikipedia.org/wiki/Quantum_logic_gate#Hadamard_gate)

$$
H = \frac{1}{\sqrt{2}}\begin{pmatrix}
1 & 1 \\\\
1 & -1
\end{pmatrix}
$$

---

## Two qubits

- Work in  basis $\ket{00}$, $\ket{01}$, $\ket{10}$, $\ket{11}$

- Simplest example is [SWAP gate](https://en.wikipedia.org/wiki/Quantum_logic_gate#Swap_gate)

$$
\operatorname{SWAP}=\begin{pmatrix}
1 & 0 & 0 & 0 \\\
0 & 0 & 1 & 0 \\\
0 & 1 & 0 & 0 \\\
0 & 0 & 0 & 1
\end{pmatrix}
$$.

$$
\operatorname{SWAP}\ket{10} = \ket{01}
$$

- SWAP takes product states to product states

---

- Slightly more complicated: square root of SWAP

$$
\sqrt{\operatorname{SWAP}}=\begin{pmatrix}
1 & 0 & 0 & 0 \\\
0 & \frac{1}{2}(1+i) & \frac{1}{2}(1-i) & 0 \\\
0 & \frac{1}{2}(1-i) & \frac{1}{2}(1+i) & 0 \\\
0 & 0 & 0 & 1
\end{pmatrix}
$$

- This generates _entanglement_: takes product state to non-product state

$$
\sqrt{\operatorname{SWAP}}\ket{10} = \frac{1}{2}\left[(1+i)\ket{10}+(1-i)\ket{01}\right]
$$

- $\sqrt{\operatorname{SWAP}}$ conserves number of 1s and 0s

- $\sqrt{\operatorname{SWAP}}$ together with arbitrary single qubit unitary operators form __universal gate set__ that allows for universal quantum computation

---

## General two qubit unitary

- Any two-qubit unitary $U\in \mathcal{U(4)}$ can be written

$$
U = e^{i \phi} (u_+ \otimes u_-) V[J_x, J_y, J_z] (v_- \otimes v_+)
$$

- $u_{\pm}, v_{\pm} \in SU(2)$

$$
\begin{align*}
 V[J_x, J_y, J_z] &= \exp \left[-i\left(J_x \sigma^x \otimes \sigma^x + J_y \sigma^y \otimes \sigma^y+ J_z \sigma^z \otimes \sigma^z\right)\right]\\\\
 &= \begin{bmatrix}
e^{-i J_z} \cos(J_-) & 0 & 0 & -i e^{-i J_z \sin(J_-)} \\\\
0 & e^{iJ_z} \cos(J_+) & -ie^{i J_z} \sin(J_+) & 0 \\\\
0 & -ie^{i J_z} \sin(J_+) & e^{iJ_z} \cos(J_+) & 0 \\\\
-i e^{-i J_z \sin(J_-)} & 0 & 0 & e^{-i J_z} \cos(J_-) \\\\
\end{bmatrix}
\end{align*}
$$

- 16 parameters!

---

## Entangling power



## Schmidt decomposition

## Singular value decomposition

- Often faced with need to truncate large matrices in some way due to limits of finite storage space or processing time

- What is "right" way to perform truncation?

- [Singular value decomposition](https://en.wikipedia.org/wiki/Singular_value_decomposition) (SVD) is natural in some settings: statistics, signal processing, quantum mechanics...

---

- SVD is an example of [matrix factorization](https://en.wikipedia.org/wiki/Matrix_decomposition)

$$
M = U\Sigma V
$$

- $U$ and $V$ unitary; $\Sigma$ diagonal with non-negative real entries

- SVD _completely general_: applies to _rectangular matrices_ 

- If $M$ is $m\times n$, $U$ is $m\times m$, $V$ is $n\times n$, and $\Sigma$ is $m\times n$

- $\min(m,n)$ diagonal elements $\sigma_i$ of $\Sigma$ are _singular values_

---

## Geometrical interpretation

- Columns of $V$ define an orthonormal basis $\mathbf{v}_i\in \mathbb{C}^n$ ($i=1,\ldots n$)

- $U$ defines a basis $\mathbf{u}_i\in \mathbb{C}^m$ $i=1,\ldots m$

- If we act on $\mathbf{v}_i$ with $M$ (to the left) we get $\sigma_i \mathbf{u}_i$

---

- Number of nonzero singular values is [rank](https://en.wikipedia.org/wiki/Rank_(linear_algebra)) of matrix

- Equal to number of independent rows or columns

- For general rectangular matrix rank is $\min(m,n)$

---

- Often want to produce [low rank approximation](https://en.wikipedia.org/wiki/Low-rank_approximation)

- Need to define how well the matrix is approximated by the lower rank matrix $M_r$ of rank $r<\min(m,n)$

- One possibility: [Frobenius norm](https://en.wikipedia.org/wiki/Matrix_norm#Frobenius_norm) of $M-M_r$ should be as small as possible.

- Frobenius norm $\|A\|_{\mathrm{F}}$ of a matrix $A$ is

$$
\begin{equation}
\|A\|_{\mathrm{F}}^2=\sum_i^m \sum_j^n\left|A_{i j}\right|^2
\end{equation}
$$

---

- $\exists$ following simple result: best low rank approximation of rank $r$ obtained by taking SVD and discarding all but $r$ largest singular values from matrix $\Sigma$

- i.e. retain only $r$ "most important" directions $\mathbf{v}_i\in \mathbb{C}^n$ and $\mathbf{u}_i\in \mathbb{C}^m$

---


## SVD in quantum mechanics

- SVD arises naturally in QM of composite systems (with two subsystems)

- Example: two spins $\mathbf{S}_A$ and $\mathbf{S}_B$

- Hilbert space of each spin has dimension $n_{A,B}\equiv 2S_{A,B}+1$, where $\mathbf{S}_{A,B}^2=S_{A,B}(S_{A,B}+1)$ (e.g. 2 for spin-1/2). 

---

- General state lives in $n_A\times n_B$ dimensional Hilbert space 

- Write in terms of basis vectors $\ket{a}_A$ and $\ket{b}_B$ for A and B subsystems as

$$
\ket{\Psi_{AB}} = \sum_{a=1}^{n_A}\sum_{b=1}^{n_B} \psi_{ab}\ket{a}_A\ket{b}_B 
$$

- Regard components $\psi_{ab}$ as a matrix and perform SVD

- Equivalent to finding new orthonormal bases $\ket{\tilde n}_{A,B}$ for two spaces s.t. action of $\psi_{ab}$ maps between basis vectors of two subsystems (with rescaling)

---

- In new bases, state $\ket{\Psi_{AB}}$ is

$$
\ket{\Psi_{AB}} = \sum_{n=1}^{\min(n_A,n_B)} \lambda_n\ket{\tilde n}_A\ket{\tilde n}_B.
$$

- Note _single sum_  c.f. double sum before

- This is [Schmidt decomposition](https://en.wikipedia.org/wiki/Schmidt_decomposition): just a restatement of SVD

Notion of isometry

---

$$
\ket{\Psi_{AB}} = \sum_{n=1}^{\min(n_A,n_B)} \lambda_n\ket{\tilde n}_A\ket{\tilde n}_B
$$

- Singular values — or Schmidt coefficients — quantify [entanglement](https://en.wikipedia.org/wiki/Quantum_entanglement) of state ([2022 Nobel prize](https://www.nobelprize.org/prizes/physics/2022/summary/))

- If only one nonzero singular value state is a _product state_: no correlations between subsystems

- This might not have been evident in original form

--- 

- [Bell states](https://en.wikipedia.org/wiki/Bell_state) of two spin-1/2 subsystems

$$
\left|\Psi^{+}\right\rangle=\frac{1}{\sqrt{2}}\left(|0\rangle_A \otimes|1\rangle_B+|1\rangle_A \otimes|0\rangle_B\right)
$$

- Already written in Schmidt form and the two singular values are both $\frac{1}{\sqrt{2}}$, indicating maximal entanglement


## Quantifying entanglement

## Reduced density matrix

- Expectation value of operator in region $A$ can be computed from *reduced density matrix* $\rho_A$ for region $A$
$$
\rho_A = \operatorname{tr}_{B}\left[\ket{\Psi}\bra{\Psi}\right]=\operatorname{tr}_{B}\left[\mathcal{U}\ket{\Psi_0}\bra{\Psi_0}\mathcal{U}^\dagger\right]
$$
($B$ is complement of $A$)

---

<object data="assets/reduced-density-matrix.svg" type="image/svg+xml"></object>

- Initial RDM of bottom part of wedge is all that matters!

---

## Quantifying entanglement

- RDM quantifies entanglement present in a quantum state describing a system composed of two subsystems A and B

- General state is vector $\in\mathcal{H}=\mathcal{H}_A\otimes\mathcal{H}_B$  

- Write in terms of basis vectors $\ket{a}_A$ and $\ket{b}_B$ for A and B subsystems
$$
\ket{\Psi}_{AB} = \sum_{a=1}^{n\_A}\sum_{b=1}^{n_B} \Psi_{ab}\ket{a}_A\ket{b}_B 
$$
$n_{A/B}=\operatorname{dim} \mathcal{H}_{A/B}$

- Now regard $\psi_{ab}$ as matrix and perform a singular value decomposition

---

- In new bases our state is

$$
\ket{\Psi}_{AB} = \sum_{n=1}^{\min(n_A, n_B)} \sigma_n \ket{u_n}_A\otimes\ket{v_n}_B
$$

- Note _single sum_, c.f. double sum earlier. This is [Schmidt decomposition](https://en.wikipedia.org/wiki/Schmidt_decomposition) 

- $\sigma_n$ are Schmidt coefficients (singular values of SVD)

- If only one nonzero singular value state we have _product state_,  indicating no correlations between subsystems

---

- Simplest example displaying nontrivial entanglement is [Bell state](https://en.wikipedia.org/wiki/Bell_state) 

$$
\left|\Psi^{+}\right\rangle=\frac{1}{\sqrt{2}}\left(|0\rangle_A \otimes|1\rangle_B+|1\rangle_A \otimes|0\rangle_B\right)
$$

- Schmidt coefficients both $\frac{1}{\sqrt{2}}$, indicating maximal entanglement

- Schmidt decomposition closely related to RDM
$$
\rho_A = \operatorname{tr}_B\left[\ket{\Psi}\bra{\Psi}\right] 
= \sum_n \sigma_n^2 \ket{u_n}\bra{u_n}
$$

- Eigenvalues of RDM are $p_n=\sigma_n^2$


---

- One measure of entanglement is von Neumann entropy of $\rho_A$ (aka **entanglement entropy**)

$$
S^{(\text{vN})}_A \equiv -\operatorname{tr}\left[\rho_A\log \rho_A\right]
$$

- $S_A$ vanishes for product state, and is otherwise positive

---

- [Rényi entropies](https://en.wikipedia.org/wiki/R%C3%A9nyi_entropy) provide more complete information
$$
  S^{(\alpha)}_A = \frac{1}{1-\alpha}\log \operatorname{tr}\left[\rho^n\right]=\frac{1}{1-\alpha}\sum\_n p\_n^\alpha
$$
$S^{(\text{vN})}_A=\lim_{\alpha\to 1} S^{(\alpha)}_A$. $S^{(0)}_A$ is number of nonzero Schmidt coefficients (aka [Schmidt rank](https://en.wikipedia.org/wiki/Schmidt_decomposition#Schmidt_rank_and_entanglement))
$$
S^{(2)}_A = -\log \sum_n p_n^2 = -\log \gamma\operatorname{tr} \rho_A^2
$$
where $\gamma\equiv \operatorname{tr} \rho_A^2$ is [purity](https://en.wikipedia.org/wiki/Purity_(quantum_mechanics))

## Maximal entanglement

- Entanglement between subsystems is maximal when the matrix is an isometry

## Entanglement entropy

# Gates

## Penrose tensor notation

## Unitarity

<figure align="center">
<img src="assets/unitarity.svg" width="90%">
</figure>

## Folded notation

Show unitarity in the folded picture


## "Folded" representations

- Since every $U$ accompanied by $U^\dagger$, include both in single unit by "folding" one on top of the other

<p align="center">
<img src="assets/diag_folded.png" width="60%">
</p>


![](assets/folded_gate_definition_v2.svg){width=80%}

- Lines correspond to two indices, and therefore $2^2=4$ dimensions

---

- Unitarity condition takes form:

![](assets/folded_unitarity_condition.svg){width=80%}


## Dual unitaries

![](assets/dual_unitarity_folded.svg){width=80%}

- Introduced in...
- See review

---

# Circuits


## One motivation: time evolution

### Single qubit gates

- Time evolution operator $U=\exp(-iHt)$

- If $H=\sum_j h_j$ a sum of single qubit terms

$$
\mathcal{U} = \exp(-iHt) = \prod_j \exp(-ih_j) = \prod_j U_j
$$
$$
U_j=\mathbb{1}\otimes \ldots \otimes\mathbb{1} \otimes \overbrace{u_j}^{j\text{th factor}} \ldots \otimes\mathbb{1}
$$

---

### Two qubit gates

- Simplest example of two qubit interaction is __exchange Hamiltonian__

$$
\begin{align*}
h_{12} &= J\left[X\otimes X+Y\otimes Y+Z\otimes Z\right] =J\left[X_1X_2+Y_1Y_2 + Z_1Z_2\right]\\\
&=2\operatorname{SWAP} - 1
\end{align*}
$$
$$
U(J) = \exp(-ih_{12}) = e^{iJ}\left[\cos (2J) \mathbb{1} - i\sin (2J) \operatorname{SWAP}\right]
$$

- Special cases 

$$
U(\pi/4)=\operatorname{SWAP}
$$
$$
U(\pi/8)=\sqrt{\operatorname{SWAP}}
$$

- Fully rotationally invariant

---

- $H=\sum_{i,j} h_{i,j}$ a sum of two qubit terms with $[h_{i,j},h_{j,k}]\neq 0$

<figure align="center">
<img src="assets/evenbly-hamiltonian.png" width="80%">
<figcaption>Source: <a href="https://www.tensors.net/exact-diagonalization">Glen Evenbly</a> </figcaption>
</figure>

- $\mathcal{U}\neq \prod_{i,j} \exp(-ih_{i,j})$. More complicated!

- __Suzuki–Trotter__ expansion: decompose $H=H_A + H_B$

$$
\mathcal{U} = \exp(-iH) = \left[\exp\left(-\frac{iH}{n}\right)\right]^n \sim \left[e^{-iH_A/n} e^{-iH_B/n}\right]^n 
$$

---

$$
H = \sum_j h_{j,j+1}
$$
$$
H_A = \sum_j h_{2j, 2j+1}\qquad H_B = \sum_j h_{2j-1, 2j}
$$
$$
e^{-iH_A/n}=\prod_j U_{2j,2j+1}\qquad e^{-iH_B/n} = \prod_j U_{2j-1,2j}
$$
<p align="center">
<img src="assets/brickwall.png" width="450"/>
</p>

---

## Floquet theory: kicked Ising model

- Time dependent Hamiltonian with kicks at $t=0,1,2,\ldots$.

$$
\begin{align*}
H_{\text{KIM}}(t) = H_\text{I}[\mathbf{h}] + \sum_{n}\delta(t-n)H_\text{K}\\\
H_\text{I}[\mathbf{h}]=\sum_{j=1}^L\left[J Z_j Z_{j+1} + h_j Z_j\right],\qquad H_\text{K} &= b\sum_{j=1}^L X_j,
\end{align*}
$$

- "Stroboscopic" form of $\mathcal{U}(t)=\mathcal{T}\exp\left[-i\int^t H_{\text{KIM}}(t') dt'\right]$

$$
\begin{aligned}
  \mathcal{U}(n_+) &= \left[\mathcal{U}(1_+)\right]^n,\qquad U(1_-) = K I_\mathbf{h}\\\
  I_\mathbf{h} &= e^{-iH_\text{I}[\mathbf{h}]}, \qquad K = e^{-iH_\text{K}}
\end{aligned}
$$

---

## KIM as a circuit

<p align="center">
<img src="assets/kim-circuit.png" width="200"/>
</p>

$$
\begin{aligned}
  \mathcal{K} &= \exp\left[-i b X\right]\\\
  \mathcal{I} &= \exp\left[-iJ Z_1 Z_2 -i \left(h_1 Z_1 + h_2 Z_2\right)/2\right]
\end{aligned}
$$

---

## Locality 

- Locality a feature of real quantum computing architectures

<figure align="center">
<img src="assets/google-sycamore-schematic.png" width="400"/>
<img src="assets/google-sycamore-photo.png" width="400"/>
<figcaption> (top) a schematic view of the Google Sycamore processor and (bottom) the real thing</figcaption>
</figure>

---

## Computational complexity

- State is vector in $2^N$ dimensional space

- Updating involves acting with a unitary matrix

- Naive matrix-vector multiplication $O(\operatorname{dim}^2)=2^{2N}$

- Since gates gives *sparse* matrices update is $O(\operatorname{dim})=2^{N}$

-  Still _exponentially hard in the number of qubits_

---

## Quantum supremacy

- Difficulty on classical computer basis of ["quantum supremacy"](https://en.wikipedia.org/wiki/Quantum_supremacy) based on circuit sampling

- Measure empirical distribution of bit strings with fixed initial state

- Total number of (time) steps $T$ taken is  *depth* of the circuit. For low depth $T<N$ it pays to move  _horizontally_ instead

- Problem of finding optimal contraction strategy in general is NP-hard

- [Google's initial claim](https://www.nature.com/articles/s41586-019-1666-5) of supremacy disputed by supercomputer optimizations, followed by improved tensor network methods: [Huang _et al._ (2020)](https://arxiv.org/abs/2005.06787), [Gray and Kourtis (2021)](https://quantum-journal.org/papers/q-2021-03-15-410/), [Pan and Zhang (2021)](https://arxiv.org/abs/2103.03074), [Napp _et al._ (2022)](https://journals.aps.org/prx/abstract/10.1103/PhysRevX.12.021021)



## Basic circuit

<figure align="center">
<img src="assets/brickwork_open.svg" width="90%">
</figure>

## Expectation value


- Folded brickwork

![](assets/folded_brickwork_circuit.svg){width=80%}

---

- In folded picture expectation value $\bra{\Psi}\mathcal{O}\ket{\Psi}$ looks like this

![](assets/folded_expectation_value_full.svg){width=80%}

---

![](assets/folded_light_cone_reduced.svg){width=80%}


- "Light cone" emerges, reflecting region of circuit that affects expectation value

---

## Correlation functions

$$
C(x,t) = d^{-N} \operatorname{tr}\left[O(x,t)O'(0,0)\right]
$$

![](assets/infinite_temperature_correlator_full.svg){width=80%}

---

![](assets/infinite_temperature_correlator_reduced.svg){width=80%}


- Correlations only nonzero inside "light cone"

## Dual unitaries

- Recall the dual unitary condition

![](assets/folded_unitarity_condition.svg){width=80%}

Correlations vanish inside 

## Light cone correlations

## Operator spreading

- How does a local operator "look" as it evolves in Heisenberg picture?

- $Z_n(t)=\mathcal{U}^\dagger(t)Z_n \mathcal{U}(t)$ appears in $\langle Z_n(t)Z_m(0) \rangle$, but this is only one "component" of $Z_n(t)$

- Any observable such as $Z_n(t)$ can be expressed as expansion
$$
Z_n(t)= \sum_{\mu_{1:N}=\\{1,x,y,z\\}^N} \mathcal{C}\_{\mu_{1:N}}(t) \sigma_1^{\mu_1}\otimes\cdots \sigma_N^{\mu_N}
$$
$$
\mathcal{C}\_{\mu_{1:N}}(0)=\begin{cases}
1 & \mu_j=z, \mu_k=1,\forall k\neq j \\\\
0 & \text{otherwise}
\end{cases}
$$

---

$$
Z_n(t)= \sum_{\mu_{1:N}=\\{1,x,y,z\\}^N} \mathcal{C}\_{\mu_{1:N}}(t) \sigma_1^{\mu_1}\otimes\cdots \sigma_N^{\mu_N}
$$

- Since $\tr\left[\sigma_\alpha\sigma_\beta\right]=2\delta_{\alpha\beta}$, can extract spin correlations from $\langle Z_j(t)Z_k(0)\rangle=C_{jk}(t) \equiv \mathcal{C}_{1\cdots \mu_k=z \cdots 1}(t)$

<figure align="center">
<img src="assets/initial-terminal.png" width="400">
</figure>

- This represents only one component of operator expansion

---

- Operator norm $\tr\left[Z\_n^2(t)\right]=2$ is conserved under time evolution

- This implies the normalization

$$
\sum_{\mu_{1:N}=\\{1,x,y,z\\}^N} \mathcal{C}^2\_{\mu_{1:N}}(t) = \frac{1}{2^{N-1}}.
$$

---

## Example: $SU(2)$ preserving gate

- Consider gate generated by exchange Hamiltonian:
$$
U\_{j,j+1} = \cos\theta \mathbb{1}\_{j,j+1} + i\sin\theta \operatorname{\mathsf{S}}\_{j.j+1}
$$
$\operatorname{\mathsf{S}}_{j,j+1}$ denotes $\operatorname{\mathsf{SWAP}}$ gate on sites $j$ and $j+1$

- Action of this gate on an operator is

$$
\mathcal{O} \longrightarrow U^\dagger\_{j,j+1}\mathcal{O}U\_{j,j+1} = \cos^2\theta \mathcal{O} + \sin^2\theta \operatorname{\mathsf{S}}\_{j.j+1}\mathcal{O} \operatorname{\mathsf{S}}\_{j.j+1} \\\
-i\sin\theta\cos\theta \left[\operatorname{\mathsf{S}}\_{j.j+1}, \mathcal{O}\right]
$$

---

## Ensemble of circuits

- Consider ensemble averaged quantities

- Take $\theta=\pm \theta_0$ with $p(\theta_0)-p(-\theta_0)\equiv \delta > 0$.

- Averaging the evolved operator gives

$$
\overline{U^\dagger_{j,j+1}\mathcal{O}U_{j,j+1}} = \cos^2\theta_0 \\, \mathcal{O} + \sin^2\theta_0 \\, \mathsf{S}\_{j.j+1}\mathcal{O} \mathsf{S}\_{j.j+1} \\\\
+i\delta \sin\theta_0\cos\theta_0 \left[\mathsf{S}\_{j.j+1}, \mathcal{O}\right]
$$

- Interpretation

  1. Operators on sites $j$ and $j+1$ switch with probability $\sin^2\theta_0$.
  2. The asymmetry $\delta$ governs strength of "quantum" dynamics

---

- Continuous time limit ([Claeys, Lamacraft & Herzog-Arbeitman (2022)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.128.246603)
$$
\frac{d\bar{\mathcal{O}}}{dt} = \sum_j \left[iJ \left[\mathsf{S}\_{j,j+1},\bar{\mathcal{O}}\right]+\left(\mathsf{S}\_{j,j+1}\bar{\mathcal{O}}\mathsf{S}\_{j,j+1}-\bar{\mathcal{O}}\right)\right]
$$
where $J\propto \delta$. Computing commutator:

$$
\begin{align*}
i[\mathsf{S},\sigma^a\otimes 1]&=-\epsilon^{abc}\sigma^b\otimes\sigma^c\nonumber\\\\
i[\mathsf{S},1\otimes \sigma^a]&=\epsilon^{abc}\sigma^b\otimes\sigma^c\nonumber\\\\
i[\mathsf{S},\sigma^a\otimes \sigma^b]&=\epsilon^{abc}\left(\sigma^c\otimes 1- 1\otimes \sigma^c\right).
\end{align*}
$$

- Describes operator "splitting" ($1\to 2$) and "merging" ($2\to 1$) 

---

## $J=0$ limit

$$
\frac{d\bar{\mathcal{O}}}{dt} = \sum_j \left[iJ \left[\mathsf{S}\_{j,j+1},\bar{\mathcal{O}}\right]+\left(\mathsf{S}_{j,j+1}\bar{\mathcal{O}}\mathsf{S}\_{j,j+1}-\bar{\mathcal{O}}\right)\right]
$$

- No splitting and merging and terms

- In single operator sector define $\mathcal{C}^a_{0\cdots \mu_k=a\cdots 0}\equiv C^a_k$
$$
\partial_t C^a_k = C^a_{k+1} + C^a_{k-1} - 2 C^a_k\equiv \Delta_k C^a_k,
$$
diffusion of single $\sigma^a$ ($\Delta_k$ is 1D discrete Laplacian)

---

## $J\neq 0$ 

$$
\partial_t \mathcal{C}\_{\mu_{1:N}} = \sum_j \left[J\epsilon_{\alpha\beta \mu_j \mu_{j+1}} \mathcal{C}\_{\mu_1\cdots \alpha\beta \cdots \mu_N} + \mathcal{C}\_{\mu_1\cdots \mu_{j+1}\mu_j \cdots \mu_N} - \mathcal{C}\_{\mu_1\cdots \mu_{j}\mu_{j+1} \cdots \mu_N}\right]
$$

- First term leads to single site operator spreading over many sites

<p align="center">
<img src="assets/2nd-order-2.png" width="250">
</p>

- Qualitative behaviour is known as __operator spreading__ and is a generic feature of operator dynamics

---

- Spreading suppressed at $J=0$ because we considered _average_

- In any sample from our random circuit, single-site operator spreads to many sites

- Random signs of coeffcients $\mathcal{C}\_{\mu_{1:N}}$ means most average to zero: only the single site contributions remain

- When $J\neq 0$ some contribution survives and this allows for a controlled expansion

- We'd like a measure that is insensitive to these random signs



## Reduced density matrix

- Expectation value of operator in region $A$ can be computed from *reduced density matrix* $\rho_A$ for region $A$
$$
\rho_A = \operatorname{tr}_{B}\left[\ket{\Psi}\bra{\Psi}\right]=\operatorname{tr}_{B}\left[\mathcal{U}\ket{\Psi_0}\bra{\Psi_0}\mathcal{U}^\dagger\right]
$$
($B$ is complement of $A$)

---


- Initial RDM of bottom part of wedge is all that matters!


## Entanglement 

- Entanglement determined by triangular wedge

![](assets/entanglement_wedge_bipartition.svg){width=80%}

---

![](assets/entanglement_wedge_factorised.svg){width=80%}

## Bell initial state

![](assets/wedge_bell_pairs_offset.svg){width=80%}

- For dual unitary gates this is an _isometry_!
- Consequences for entanglement

## Entanglement growth

- Maximal

- Result about converse

## Dual unitary circuit

## Generalized initial states


# Some special kinds of circuits

## Random circuits

## Dual unitary circuits

# Open questions

...


