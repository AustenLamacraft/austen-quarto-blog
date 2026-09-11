---
# See all reveal options
# https://quarto.org/docs/reference/formats/presentations/revealjs.html
# E to toggle to PDF mode
title: |
    Many Body Dynamics in Quantum Circuits
subtitle: |
  QUANT26: Quantum Dynamics - Fundamentals and Realizations

  MPIPKS Dresden
author: "Austen Lamacraft"
date: 09/11/2026
date-format: long
institute: University of Cambridge
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

- As number of subsystems $N$ increases, dimensionality of $\ket{\Psi}$ grows exponentially

- What are the _qualitative_ features of quantum many-body dynamics?

- Choose models that are tractable and generic(-ish)


## What is a quantum circuit?

- A way to describe operations on quantum state, usually consisting of several __qubits__ (spin 1/2 subsystems with Hilbert space $\mathbb{C}^2$)

- Two quantum states $\ket{0}$ and $\ket{1}$  define the **computational basis**.

<p align="center">
<img src="assets/Reversible_circuit_composition.svg.png" width="15%">
</p>

- $f$ acts on top five qubits, then $g$ acts on lower seven

## N qubit states

- State of $N$ qubits expressed in product basis
  
$$
\ket{\Psi} = \sum_{s_{1:N}\in \{0,1\}^N} \Psi_{s_1\ldots s_N}\ket{s_1}_1\ket{s_2}_2\cdots \ket{s_N}_N
$$

- Write $\ket{s_1}_1\ket{s_2}_2\cdots \ket{s_N}_N =\ket{s_1\cdots s_N}=\ket{s_{1:N}}$ for brevity 

- Operator on $N$ qubits has matrix elements

$$
\mathcal{O}_{s_{1:N},s'_{1:N}} = \bra{s_{1:N}}\mathcal{O}\ket{s'_{1:N}}
$$


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

- __For this audience:__ example of discrete time, many body dynamics

- Model of universal quantum computation 
  - How to generate an arbitrary quantum state
  - One of several options e.g. measurement-based

- _They exist!_ Companies (Google, IBM, etc.) have built platforms for gate-based QC

- Here we are concerned with __unitary circuits__ made from __unitary gates__

## Outline 

- Gates (and entanglement)
- Some graphical tools
- Dynamics in brickwork circuits

![](assets/brickwork_open.svg){width=60% fig-align="center"}

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

$$
\operatorname{SWAP}\ket{s_1,s_2} = \ket{s2,s1}
$$

![](assets/swap_gate_wire_crossing.svg){width=100% fig-align="center"}

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
%  &= \begin{bmatrix}
% e^{-i J_z} \cos(J_-) & 0 & 0 & -i e^{-i J_z \sin(J_-)} \\\\
% 0 & e^{iJ_z} \cos(J_+) & -ie^{i J_z} \sin(J_+) & 0 \\\\
% 0 & -ie^{i J_z} \sin(J_+) & e^{iJ_z} \cos(J_+) & 0 \\\\
% -i e^{-i J_z \sin(J_-)} & 0 & 0 & e^{-i J_z} \cos(J_-) \\\\
% \end{bmatrix}
\end{align*}
$$

- 16 parameters!

---


## Aside: Entanglement

- Feature of quantum state of system consisting of two or more subsystems

- Example: two spins $\mathbf{S}_A$ and $\mathbf{S}_B$

- Hilbert space of each spin has dimension $n_{A,B}\equiv 2S_{A,B}+1$, where $\mathbf{S}_{A,B}^2=S_{A,B}(S_{A,B}+1)$ (e.g. 2 for spin-1/2). 

---

- General state lives in $n_A\times n_B$ dimensional Hilbert space 

- Write in terms of basis vectors $\ket{a}_A$ and $\ket{b}_B$ for A and B subsystems as

$$
\ket{\Psi_{AB}} = \sum_{a=1}^{n_A}\sum_{b=1}^{n_B} \Psi_{ab}\ket{a}_A\ket{b}_B 
$$

- Special case is _product state_ $\ket{\Psi_{AB}} = \ket{a}_A\ket{b}_B$

- Other states are _entangled_ e.g. [Bell state](https://en.wikipedia.org/wiki/Bell_state)

$$
\left|\Psi^{+}\right\rangle=\frac{1}{\sqrt{2}}\left(|0\rangle_A \otimes|1\rangle_B+|1\rangle_A \otimes|0\rangle_B\right)
$$

---

$$
\ket{\Psi_{AB}} = \sum_{a=1}^{n_A}\sum_{b=1}^{n_B} \Psi_{ab}\ket{a}_A\ket{b}_B 
$$

- Regard components $\Psi_{ab}$ as matrix and perform [singular value decomposition](https://en.wikipedia.org/wiki/Singular_value_decomposition) (SVD)

$$
\Psi = U\Sigma V
$$

- $U$ and $V$ unitary; $\Sigma$ diagonal with non-negative real entries

- If $\Psi$ is $n_A\times n_B$, $U$ is $n_A\times n_A$, $V$ is $n_B\times n_B$, and $\Sigma$ is $n_A\times n_B$

- $n=\min(n_A,n_B)$ diagonal elements $\sigma_i$ of $\Sigma$ are _singular values_

---

$$
\Psi = U\Sigma V
$$

- Equivalent to

$$
\ket{\Psi_{AB}} = \sum_{n=1}^{n} \lambda_n\ket{\tilde n}_A\ket{\tilde n}_B.
$$

- Note _single sum_  c.f. double sum before

- This is [Schmidt decomposition](https://en.wikipedia.org/wiki/Schmidt_decomposition): just a restatement of SVD

---

$$
\ket{\Psi_{AB}} = \sum_{n=1}^{n} \lambda_n\ket{\tilde n}_A\ket{\tilde n}_B
$$

- Singular values — or Schmidt coefficients — quantify [entanglement](https://en.wikipedia.org/wiki/Quantum_entanglement) of state ([2022 Nobel prize](https://www.nobelprize.org/prizes/physics/2022/summary/))

- If only one nonzero singular value state is a _product state_: no correlations between subsystems

- This might not have been evident in original form

--- 

- Recall Bell state

$$
\left|\Psi^{+}\right\rangle=\frac{1}{\sqrt{2}}\left(|0\rangle_A \otimes|1\rangle_B+|1\rangle_A \otimes|0\rangle_B\right)
$$

- Already written in Schmidt form and the two singular values are both $\frac{1}{\sqrt{2}}$, indicating maximal entanglement


## Reduced density matrix

$$
\ket{\Psi_{AB}} = \sum_{n=1}^{n} \lambda_n\ket{\tilde n}_A\ket{\tilde n}_B
$$

- Schmidt decomposition closely related to the _reduced density matrix_

- RDM $\rho_A$ for subsystem $A$
$$
\rho_A = \operatorname{tr}_{B}\left[\ket{\Psi_{AB}}\bra{\Psi_{AB}}\right]
$$

- In terms of the Schmidt basis 

$$
\rho_A = \sum_{n=1}^{n} \lambda_n^2\ket{\tilde n}_A\bra{\tilde n}_A
$$

- Eigenvalues of RDM are $p_n = \lambda_n^2$. Note that $\operatorname{tr}\rho_A=\sum_n p_n = 1$

## Quantifying entanglement

- One measure of entanglement is von Neumann entropy of $\rho_A$ (aka **entanglement entropy**)

$$
S^{(\text{vN})}_A \equiv -\operatorname{tr}\left[\rho_A\log \rho_A\right] = -\sum_n p_n \log p_n
$$

- $S_A$ vanishes for product state (only one $p_n=1$), and is otherwise positive

## Some useful results 

$$
\ket{\Psi_{AB}} = \sum_{n=1}^{n} \lambda_n\ket{\tilde n}_A\ket{\tilde n}_B
$$

- Unitary transformations $U_{A/B}$ on subsystems do not affect entanglement
- Maximal entanglement is $\log n$, where $n=\min(n_A,n_B)$
- Entanglement between subsystems is maximal when $\Psi_{AB}$ is unitary (if $n_A=n_B$) or generally an _isometry_


# Some graphical tools

## Everything is a tensor

- State of $N$ qubits expressed in product basis
  
$$
\ket{\Psi} = \sum_{s_{1:N}\in \{0,1\}^N} \Psi_{s_1\ldots s_N}\ket{s_1}_1\ket{s_2}_2\cdots \ket{s_N}_N
$$

- Operator on $N$ qubits has matrix elements

$$
\mathcal{O}_{s_{1:N},s'_{1:N}} = \bra{s_{1:N}}\mathcal{O}\ket{s'_{1:N}}
$$


## Graphical notation

- A tensor is denoted by a blob with one leg for each index

- Connecting legs denotes contraction: summing over a shared index

<figure align="center">
<img src="assets/contractions.png" width="100%">
<figcaption>See <a href="https://www.tensors.net/tutorial-1">Glen Evenbly's tensor contraction tutorial</a> </figcaption>
</figure>

## Two qubit unitary

![](assets/two_qubit_gate_tile.svg){width=200% fig-align="center"}

## Unitarity

- Unitarity of two qubit gate expressed as

$$
\sum_{s_1's_2'}U_{s_1s_2,s'_1s'_2} U^\dagger_{s'_1s'_2,s''_1s''_2}=\delta_{s_1,s_1''} \delta_{s_2,s_2''}
$$

- ...or in graphical form

![](assets/unitarity.svg){width=100%}

## "Folded" representations

- Since every $U$ accompanied by $U^\dagger$, include both in single unit by "folding" one on top of the other

![](assets/folded_gate_definition_v2.svg){width=100%}

- Lines correspond to two indices, and therefore $2^2=4$ dimensions

---

- Unitarity condition takes form:

![](assets/folded_unitarity_condition.svg){width=80%}


## Dual unitaries

![](assets/dual_unitarity_folded.svg){width=80%}

- Circuits based on DUs introduced in [Gopalakrishnan and Lamacraft (2019)](https://journals.aps.org/prb/abstract/10.1103/PhysRevB.100.064309), [Bertini, Kos, and Prosen (2019)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.123.210601)

- 14 parameter family (c.f. 16 parameters for general two qubit unitary)

- Includes range of behaviour: integrable, chaotic

# Circuits

- Kicked Ising model
- Expectation values
- Correlation functions
- Entanglement

## Motivation: kicked Ising model

---

### Single qubit gates

- Time evolution operator $\mathcal{U}=\exp(-iHt)$

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

![_Brickwork_ circuit](assets/brickwork_open.svg){width=40% fig-align="center"}

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

![](assets/kim-circuit.png){fig-align="center"}

$$
\begin{aligned}
  \mathcal{K} &= \exp\left[-i b X\right]\\\
  \mathcal{I} &= \exp\left[-iJ Z_1 Z_2 -i \left(h_1 Z_1 + h_2 Z_2\right)/2\right]
\end{aligned}
$$

- _Dual unitary_ when $b=J=\pi / 4$!

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


![](assets/brickwork_open.svg){width=80% fig-align="center"}


## Folded brickwork

![](assets/folded_brickwork_circuit.svg){width=80% fig-align="center"}

## Expectation value

- In folded picture expectation value $\bra{\Psi}\mathcal{O}\ket{\Psi}$ looks like this

![](assets/folded_expectation_value_full.svg){width=80% fig-align="center"}

---

- Recall unitarity

![](assets/folded_unitarity_condition.svg){width=80% fig-align="center"}

---

![](assets/folded_light_cone_reduced.svg){width=80% fig-align="center"}


- "Light cone" emerges: region of circuit that affects expectation value

---

## Correlation functions

$$
C(x,t) = d^{-N} \operatorname{tr}\left[O(x,t)O'(0,0)\right]
$$

![](assets/infinite_temperature_correlator_full.svg){width=80% fig-align="center"}

---

![](assets/infinite_temperature_correlator_reduced.svg){width=80% fig-align="center"}


- Correlations only nonzero inside "light cone"


## Dual unitaries

- Recall the dual unitary condition

![](assets/dual_unitarity_folded.svg){width=80% fig-align="center"}

- Correlations vanish inside: $C(x,t)=d^{-1}\operatorname{tr}\left[O\right]\operatorname{tr}\left[O'\right]$

## Light cone correlations

- For $x=t$ the picture simplifies...

![](assets/lightcone_correlator_degenerate_chain.svg){width=80% fig-align="center"}

---

![Figure from Bertini, Claeys, Prosen ([Rev. Mod. Phys. 98, 025001 (2026)](https://journals.aps.org/rmp/abstract/10.1103/yx73-dk86))](assets/unitarity-space-time.png){width=60%}

---

## Computation of correlators

![](assets/lightcone_transfer_map_definition.svg){width=100% fig-align="center"}


$$
  \mathcal{M}_{+}(a)
  \;=\;
  \frac{1}{d}\,\operatorname{tr}_{1}\!\left[\,U^{\dagger}\,(a \otimes \mathbb{1})\,U\,\right]
$$

$$
  C(t,t)
  \;=\;
  \frac{1}{d}\,\operatorname{tr}\!\left[\,O^{\dagger}\,\mathcal{M}_{+}^{\,t}(O')\,\right]
$$

## Behaviour of correlation functions

![Figure from Bertini, Claeys, Prosen ([Rev. Mod. Phys. 98, 025001 (2026)](https://journals.aps.org/rmp/abstract/10.1103/yx73-dk86))](assets/correlation-zoo.png){width=60%}

## Quantinuum experiment

- Correlations measured in SDKIM in 2022 ([Nat. Phys. 18, 1074 (2022)](https://www.nature.com/articles/s41567-022-01689-7))

![](assets/quantinuum.png)

---

## Operator spreading

- How does a local operator "look" as it evolves in Heisenberg picture?

- $Z_n(t)=\mathcal{U}^\dagger(t)Z_n \mathcal{U}(t)$ appears in $\langle Z_n(t)Z_m(0) \rangle$, but this is only one "component" of $Z_n(t)$

- Any observable such as $Z_n(t)$ can be expressed as expansion
$$
Z_n(t)= \sum_{\mu_{1:N}=\{1,x,y,z\}^N} \mathcal{C}_{\mu_{1:N}}(t) \sigma_1^{\mu_1}\otimes\cdots \sigma_N^{\mu_N}
$$
$$
\mathcal{C}_{\mu_{1:N}}(0)=\begin{cases}
1 & \mu_j=z, \mu_k=1,\forall k\neq j \\\\
0 & \text{otherwise}
\end{cases}
$$

---

$$
Z_n(t)= \sum_{\mu_{1:N}=\{1,x,y,z\}^N} \mathcal{C}_{\mu_{1:N}}(t) \sigma_1^{\mu_1}\otimes\cdots \sigma_N^{\mu_N}
$$

- Since $\operatorname{tr}\left[\sigma_\alpha\sigma_\beta\right]=2\delta_{\alpha\beta}$, can extract spin correlations from $\langle Z_j(t)Z_k(0)\rangle=C_{jk}(t) \equiv \mathcal{C}_{1\cdots \mu_k=z \cdots 1}(t)$

<figure align="center">
<img src="assets/initial-terminal.png" width="400">
</figure>

- This represents only one component of operator expansion

---

- Operator norm $\operatorname{tr}\left[Z_n^2(t)\right]=2$ is conserved under time evolution

- This implies the normalization

$$
\sum_{\mu_{1:N}=\{1,x,y,z\}^N} \mathcal{C}^2_{\mu_{1:N}}(t) = \frac{1}{2^{N-1}}.
$$

- An initially localized operator will tend to _spread_ over an every growing number of sites

## Butterfly velocity

- Front propagation characterised by finite velocity $v_\text{B}$

![](assets/space-time-front.png){width=60% fig-align="center"}

- Analytical progress possible in _random unitary circuits_

- Map operator spreading to a Markov chain 

## Entanglement: toy model

- Circuit of SWAP gates
<figure align="center">
<img src="assets/bell-swap.png" width="80%"/>
</figure>

- Initial state is product of Bell states
$$
\ket{\Phi^+}_{2n, 2n+1} = \frac{1}{\sqrt{2}}\left[\ket{0}_{2n}\ket{0}_{2n+1}+ \ket{1}_o{2n}\ket{1}_{2n+1}\right]
$$
$$
\operatorname{tr}_{2}\left[\ket{\Phi^+}_{12}\bra{\Phi^+}_{12}\right] = \frac{1}{2}\mathbb{1}_1
$$
with entanglement entropy of one bit

---

- $\rho_A$ therefore has factor $\mathbb{1}_n$ for each site $n\in A$ with "partner" in $B$

- If _both_ qubits of a Bell pair are at sites  $n,m\in A$ they give a factor $\ket{\Phi^+}_{nm}\bra{\Phi^+}_{nm}$: a pure state

- Entanglement entropy has contributions from first case only

$$
 S_A = \min(4\lfloor t/2\rfloor, |A|) \text{ bits}
$$

---

$$
 S_A = \min(4\lfloor t/2\rfloor, |A|) \text{ bits}
$$

- After time $\sim |A|/2$ subsystem has thermalized. 

<figure align="center">
<img src="assets/bertini.png" width="400">
<figcaption> 
Source:  <a href="https://journals.aps.org/prx/abstract/10.1103/PhysRevX.9.021033">Bertini et al. (2019)</a>
</figcaption>
</figure>


--- 

- Ramp behaviour in many systems

- In noninteracting systems or integrable systems, often explained in terms of the causal propagation of (quasi-)particles:

<figure align="center">
<img src="assets/qp.png" width="300">
<figcaption> 
Source:  <a href="https://iopscience.iop.org/article/10.1088/1742-5468/2005/04/P04010/meta">Calabrese and Cardy (2005)</a>
</figcaption>
</figure>

---

- Toy model with SWAP gates is rather similar, with qubits playing the role of "noninteracting particles"

- This picture remains true in circuits where there is no quasiparticle interpretation


## Entanglement in general

- Entanglement determined by triangular wedge

![](assets/entanglement_wedge_bipartition.svg){width=80%}

---

![](assets/entanglement_wedge_factorised.svg){width=80%}

## Bell initial state

![](assets/wedge_bell_pairs_offset.svg){width=80%}

- For dual unitary gates this is an _isometry_!
- Entanglement growth therefore _maximal_
- Converse – maximal entanglement growth implies dual unitary gates – recently proved by [Zhou and Harrow (2022)](https://arxiv.org/abs/2204.10341)


# Further reading

- _Exactly solvable quantum many-body dynamics from space-time duality_, Bertini, Claeys, Prosen ([Rev. Mod. Phys. 98, 025001 (2026)](https://journals.aps.org/rmp/abstract/10.1103/yx73-dk86))

-  _Random Quantum Circuits_, Fisher, Khemani, Nahum, Vijay ([Ann. Rev. of Cond. Matt. 
Phys. 14:335-379 (2023)](https://doi.org/10.1146/annurev-conmatphys-031720-030658))


