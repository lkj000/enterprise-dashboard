import CyberDefenseMatrixData from '../../data-json/ciberDefenseData.json';

export const CyberData = CyberDefenseMatrixData;

// HEADERS
export const HeaderData = [
  {
    title: 'DEVICES',
    description: 'Assets that are not developed internally such as laptops, mobile devices, vendor appliances, network switches, etc.'
  },
  {
    title: 'NETWORKS',
    description: 'The logical and virtual transmission media through which devices communicate such as VLANs, VPNs, the Internet, etc.'
  },
  {
    title: 'APPLICATIONS',
    description: 'The software solutions developed internally, including web applications, Java applications, APIs, etc.'
  },
  {
    title: 'DATA',
    description: 'All forms of data including files, data in transit, data stored in structured or unstructured databases, etc.'
  },
  {
    title: 'USERS',
    description: 'The digital identities that are used to interact with computer systems such as customer accounts, employee accounts, service accounts, etc.'
  }
];

// ROWS
export const securityFunctions = ['identify', 'protect', 'detect', 'respond', 'recover'];
export const assetTypes = ['devices', 'networks', 'applications', 'data', 'users'];

// DIALOGS
export const getDialogData = (item) => [
  { title: 'Security Functions', value: item.security_function.join(', ') },
  { title: 'Asset Category', value: item.asset_category.join(', ') },
  { title: 'Environment', value: item.environment.join(', ') },
  { title: 'Maturity',  value: item.maturity }
];