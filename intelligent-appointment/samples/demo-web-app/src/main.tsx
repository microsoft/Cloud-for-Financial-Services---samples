// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import { createServices, createStateMachines, FSIAppointmentClientProvider } from '@fsi/appointment-starter-kit'
import { delegator } from './helpers/delegator'

const services = createServices({ delegator })
const stateMachines = createStateMachines(services)

ReactDOM.render(
  <React.StrictMode>
      <FSIAppointmentClientProvider stateMachines={stateMachines}>
        <App />
      </FSIAppointmentClientProvider>
  </React.StrictMode>,
    document.getElementById('root')
)

