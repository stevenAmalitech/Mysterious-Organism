// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum,
    dna,
    mutate() {
      const index = Math.floor(Math.random() * this.dna.length);

      let newBase;
      do {
        newBase = returnRandBase();
      } while (newBase === this.dna[index]);

      this.dna[index] = newBase;
      return this.dna;
    },

    compareDNA(pAequor) {
      let same = 0;

      for (let i = 0; i < pAequor.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) same++;
      }
      const percentage = (same / this.dna.length) * 100;
      console.log(
        `Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentage}% DNA in common`
      );
    },

    willLikelySurvive() {
      const temp = this.dna.filter((char) => char === "C" || char === "G");

      return temp.length / this.dna.length > 0.6;
    },
  };
}

const pAequorInstances = [];
let i = 0;
do {
  const pAequor = pAequorFactory(i, mockUpStrand());

  if (pAequor.willLikelySurvive()) pAequorInstances.push(pAequor);

  i += 2;
} while (pAequorInstances.length < 30);

console.log(pAequorInstances);
