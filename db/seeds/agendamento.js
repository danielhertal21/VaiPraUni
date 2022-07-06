/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
   return knex('agendamento').count('id as CNT')
      .then(function (rows) {
         if (rows[0].CNT == '0') {
            return knex('agendamento').insert([
               { motoristaId: 1, vagas: 3, localorigem: "Origem 1", localdestino: "Destino 1", datasaida: new Date(), horasaida: '22:50', datachegada: new Date(), horachegada: '23:00' },
               { motoristaId: 1, vagas: 3, localorigem: "Origem 2", localdestino: "Destino 2", datasaida: new Date(), horasaida: '22:50', datachegada: new Date(), horachegada: '23:00' },
               { motoristaId: 1, vagas: 3, localorigem: "Origem 3", localdestino: "Destino 3", datasaida: new Date(), horasaida: '22:50', datachegada: new Date(), horachegada: '23:00' },
            ]);
         }
      });
};

