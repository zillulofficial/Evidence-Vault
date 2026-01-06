# Evidence Vault + Request Fulfillment UI

A modern React-based evidence management system with request fulfillment workflow, built with Vite(React) and Tailwind CSS.

![React](https://vite.dev/)
![Vite](https://react.dev/)
![Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite)

##  Features

### Core Features
- **Three Complete Screens**: Evidence Vault, Evidence Detail, Buyer Requests
- **Filter & Search**: Advanced filtering with URL persistence
- **Bulk Operations**: Multi-select with "Add to Pack" functionality
- **Version Control**: Document version history with upload capability
- **Request Workflow**: Fulfill buyer requests with existing or new evidence
- **Responsive Design**: Mobile-first, fully responsive UI

###  UI Components
- **Reusable Table Component**: Configurable with selection support
- **Modal System**: Consistent dialogs for uploads and fulfillments
- **Status Chips**: Color-coded indicators for document status
- **Navigation**: Clean, intuitive screen navigation

##  Screens

### Screen A: Evidence Vault
- Table with filters (Doc Type, Status, Expiry, Search)
- Bulk selection with counter
- URL query parameter persistence
- View details navigation

### Screen B: Evidence Detail
- Document metadata display
- Version history table
- Upload new version modal
- Status indicators

### Screen C: Buyer Requests
- Request list with due dates and status
- Fulfillment modal with two options:
  - Use existing evidence
  - Upload new evidence
- Status tracking

##  Tech Stack

- **Frontend**: React 19.2, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Hooks + URL persistence
- **Build Tool**: Vite

##  Project Structure
src/
├── components/
│ ├── common/
│ │ ├── Table.jsx # Reusable table with selection
│ │ ├── Modal.jsx # Modal dialog component
│ │ └── StatusChip.jsx # Status indicator
│ └── screens/
│ ├── EvidenceVault.jsx # Screen A
│ ├── EvidenceDetail.jsx # Screen B
│ └── BuyerRequests.jsx # Screen C
├── data/
│ └── mockData.js # Mock evidence and request data
├── hooks/
│ └── useQueryParams.js # URL query management
└── App.jsx # Main application


## Quick Start

### Prerequisites
- Node.js 20+ and npm

### Installation
```bash
# Clone repository
git clone https://github.com/zillulofficial/Evidence-Vault
cd evidence-vault

# Install dependencies
npm install

# Start development server
npm run dev
