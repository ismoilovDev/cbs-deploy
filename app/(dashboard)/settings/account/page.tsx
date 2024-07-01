'use client'
import React, { useState } from 'react';

interface GeneralSettingsProps {
   // Define your props here
}

const GeneralSettings: React.FC<GeneralSettingsProps> = () => {
   const [setting1, setSetting1] = useState('');
   const [setting2, setSetting2] = useState('');

   const handleSetting1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSetting1(e.target.value);
   };

   const handleSetting2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSetting2(e.target.value);
   };

   const handleSave = () => {
      // Implement your save logic here
   };

   return (
      <div>
         <h2>General Settings</h2>
         <label>
            Setting 1:
            <input type="text" value={setting1} onChange={handleSetting1Change} />
         </label>
         <label>
            Setting 2:
            <input type="text" value={setting2} onChange={handleSetting2Change} />
         </label>
         <button onClick={handleSave}>Save</button>
      </div>
   );
};

export default GeneralSettings;