// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* istanbul ignore file */
import React from 'react';
import { SchedulingWizard } from '@fsi/appointment-starter-kit';
import "./App.css";
import { initializeIcons } from '@fluentui/react'

initializeIcons();
function App() {
  return (
      <section className="App">
          <main className="main-container">
              <SchedulingWizard />
          </main>
      </section>
  );
}

export default App;
