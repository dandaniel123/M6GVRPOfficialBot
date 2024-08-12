import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';

const staffData = {
    '123456789012345678': {
        password: 'FDHS754',
        formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSex7MFRFgMYDRqeEOyEObIfXfMtYHpJkOK2g2sSte6xmskI7w/viewform',
        scriptUrl: 'https://script.google.com/macros/s/AKfycby1b-vdILN0QctDmNRNG-EgZDniOIu6CHy0Bqnibd8Xt3XUeo-L0_uVBUm2P-j1n2R_xw/exec'  // Replace with your Google Apps Script Web App URL
    },
    '810944310613770270': {
        password: 'FD15754',
        formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSex7MFRFgMYDRqeEOyEObIfXfMtYHpJkOK2g2sSte6xmskI7w/viewform',
        scriptUrl: 'https://script.google.com/macros/s/AKfycby1b-vdILN0QctDmNRNG-EgZDniOIu6CHy0Bqnibd8Xt3XUeo-L0_uVBUm2P-j1n2R_xw/exec'  // Replace with your Google Apps Script Web App URL
    },
    // Add more staff members
};

export default {
    data: new SlashCommandBuilder()
        .setName('reopenform')
        .setDescription('Reopens the Google Form')
        .addStringOption(option => 
            option.setName('password')
                .setDescription('Your staff password')
                .setRequired(true)),
    
    async execute(interaction) {
        const userId = interaction.user.id;
        const password = interaction.options.getString('password');

        if (userId in staffData) {
            if (password === staffData[userId].password) {
                try {
                    const response = await axios.get(staffData[userId].scriptUrl);
                    if (response.status === 200) {
                        await interaction.reply({
                            content: `The form is now open. You can access it here: ${staffData[userId].formLink}`,
                            ephemeral: true
                        });
                    } else {
                        await interaction.reply({
                            content: 'Failed to open the form. Please try again later.',
                            ephemeral: true
                        });
                    }
                } catch (error) {
                    console.error('Error triggering Google Apps Script:', error);
                    await interaction.reply({
                        content: 'There was an error trying to reopen the form. Please try again later.',
                        ephemeral: true
                    });
                }
            } else {
                await interaction.reply({
                    content: 'Invalid password.',
                    ephemeral: true
                });
            }
        } else {
            await interaction.reply({
                content: "You're not a staff member.",
                ephemeral: true
            });
        }
    }
};
