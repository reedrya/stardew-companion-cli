// index.js for CLI
import('inquirer').then(async (inquirer) => {
    const axios = require('axios');

    const BASE_URL = 'http://localhost';
  
    const microservices = {
        cropInfo: { name: 'Crop Information', port: 3000 },
        villagerBirthdays: { name: 'Villager Birthdays', port: 3001 },
        gameLore: { name: 'Game Lore', port: 3002 }
    };
      
    async function fetchData(service, endpoint, params) {
        const baseURL = `${BASE_URL}:${service.port}`;
        try {
            const response = await axios.get(`${baseURL}/${endpoint}`, { params });
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${service.name}:`, error);
            return null;
        }
    }
      
    async function main() {
        let selectedService;
        let endpoint, params;
        let goingBack = false;

        while (!goingBack) {
            const { service } = await inquirer.default.prompt([
                {
                    type: 'list',
                    name: 'service',
                    message: 'Select a service:',
                    choices: [
                        ...Object.values(microservices).map(service => service.name),
                        'Go Back'
                    ]
                }
            ]);
      
            if (service === 'Go Back') {
                goingBack = true;
                continue;
            }
      
            selectedService = Object.values(microservices).find(s => s.name === service);
      
            if (selectedService === microservices.cropInfo) {
                const { season } = await inquirer.default.prompt([
                    {
                        type: 'list',
                        name: 'season',
                        message: 'Select a season:',
                        choices: ['Spring', 'Summer', 'Fall', 'Winter', 'Go Back']
                    }
                ]);
                if (season === 'Go Back') {
                    continue;
                }
                endpoint = `crop-info/${season}`;
            } else if (selectedService === microservices.villagerBirthdays) {
                const { season } = await inquirer.default.prompt([
                    {
                        type: 'list',
                        name: 'season',
                        message: 'Select a season:',
                        choices: ['Spring', 'Summer', 'Fall', 'Winter', 'Go Back']
                    }
                ]);
                if (season === 'Go Back') {
                    continue;
                }
                endpoint = `villager-birthdays/${season}`;
            } else if (selectedService === microservices.gameLore) {
                endpoint = 'game-lore/random-fact';
            }
        
            const data = await fetchData(selectedService, endpoint, params);
            displayData(selectedService, data);
        }
    }
      
    function displayData(service, data) {
        if (!data) {
            console.log(`Failed to fetch ${service.name}.`);
            return;
        }
        console.log(`${service.name}:`);
        console.log(data);
    }
      
    main();
}).catch(error => {
    console.error('Error loading inquirer:', error);
});
