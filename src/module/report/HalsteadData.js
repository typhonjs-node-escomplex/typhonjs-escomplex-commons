'use strict';

export default class HalsteadData
{
   constructor()
   {
      this.bugs = 0;
      this.difficulty = 0;
      this.effort = 0;
      this.length = 0;
      this.time = 0;
      this.vocabulary = 0;
      this.volume = 0;

      this.operands = { distinct: 0, total: 0, identifiers: [] };
      this.operators = { distinct: 0, total: 0, identifiers: [] };
   }

   reset()
   {
      this.bugs = this.difficulty = this.effort = this.length = this.time = this.vocabulary = this.volume = 0;
   }
}
