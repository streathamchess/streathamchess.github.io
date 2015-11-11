---
---


root = exports ? this

#Probability of playing black games or more  out of total games
root.probSum = (total, black) -> ([black..total].map (b) -> prob(total, b)).reduce (p1, p2) -> p1 + p2

#Probability of playing exactly black games out of total games
prob = (total, black) -> binomial(total, black) / Math.pow(2, total)

binomial = (n, k) -> if (k==0) then 1 else (n/k) * binomial(n-1, k-1)
