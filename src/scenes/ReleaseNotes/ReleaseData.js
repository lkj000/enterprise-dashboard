import React from 'react';
import AnimationOutlinedIcon from '@mui/icons-material/AnimationOutlined';
import AutofpsSelectOutlinedIcon from '@mui/icons-material/AutofpsSelectOutlined';
import AutoModeOutlinedIcon from '@mui/icons-material/AutoModeOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';
import DnsIcon from '@mui/icons-material/Dns';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import GoogleIcon from '@mui/icons-material/Google';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StorageIcon from '@mui/icons-material/Storage';


  const ReleaseData = [
    {
      label: 'AKS',
      value: '1',
      icon: (<DeviceHubOutlinedIcon />)
    },
    {
      label: 'AUT',
      value: '2',
      icon: (<AutoModeOutlinedIcon />)
    },
    {
      label: 'GKE',
      value: '6',
      icon: (<CloudCircleIcon />)
    },
    {
      label: 'Azure',
      value: '5',
      icon: (<CloudQueueOutlinedIcon />)
    },
    {
      label: 'GCP',
      value: '11',
      icon: (<GoogleIcon />)
    },
    {
      label: 'ART',
      value: '3',
      icon: (<AutofpsSelectOutlinedIcon />)
    },
    {
      label: 'VM',
      value: '4',
      icon: (<DvrOutlinedIcon />)
    },
    {
      label: 'Gen AI',
      value: '13',
      icon: (<PsychologyIcon />)
    },
    {
      label: 'Infrastructure',
      value: '14',
      icon: (<DnsIcon />)
    },
    {
      label: 'Database',
      value: '16',
      icon: (<StorageIcon />)
    },
    {
      label: 'Power Platforms',
      value: '7',
      icon: (<BoltOutlinedIcon />)
    },
    {
      label: 'Salesforce',
      value: '15',
      icon: (<FilterDramaIcon />)
    },
    {
      label: 'Mobile',
      value: '12',
      icon: (<MobileScreenShareIcon />)
    },
    {
      label: 'Databricks',
      value: '9',
      icon: (<DatasetOutlinedIcon />)
    },
    {
      label: 'AEM',
      value: '10',
      icon: (<AnimationOutlinedIcon />)
    },
    {
      label: 'MQ',
      value: '8',
      icon: (<MenuOpenOutlinedIcon />)
    }
  ];


export default ReleaseData;