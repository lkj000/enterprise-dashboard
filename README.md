Here is a simple flow chart:

  
```mermaid
 
graph LR
    subgraph Incidents
        A[INC11811663] --> B{WAN1}
        B --> C{Store #0065}
        C --> D{Packet Loss & Latency}
        D --> E{Meraki MX0065A}
        E --> F{In Progress}
        F --> G{Assigned to EIoT}
        G --> H{Managed by Ian Long}
        
        I[INC11815749] --> J{WAN2}
        J --> K{Store #0467}
        K --> L{Packet Loss & Latency}
        L --> M{Meraki MX0467A}
        M --> N{On Hold}
        N --> O{High Priority & Impact}
        O --> P{Medium Urgency}
        P --> Q{Assigned to Michael John Palma}
        Q --> R{Managed by Raymund Roda}
        
        S[INC11819543] --> T{WAN1}
        T --> U{Store #2535}
        U --> V{Packet Loss & Latency}
        V --> W{Data Loss Event}
        W --> X{Meraki MX2535B}
        X --> Y{In Progress}
        Y --> Z{High Priority & Impact}
        Z --> AA{Assigned to Raymond John Tence}
        AA --> AB{Managed by Raymund Roda}
        
        AC[INC11817084] --> AD{WAN1}
        AD --> AE{Store #2203}
        AE --> AF{Packet Loss & Latency}
        AF --> AG{Meraki MX2203B}
        AG --> AH{RouterId 1275161}
        AH --> AI{On Hold}
        AI --> AJ{High Priority & Impact}
        AJ --> AK{Assigned to Hazel Manlalangit}
        AK --> AL{Managed by Command Center Operations}
        
        AM[INC11818972] --> AN{WAN2 BB}
        AN --> AO{Network Id: N_721138890332708178}
        AO --> AP{Organization Id: 721138890332700680}
        AP --> AQ{Network Outage}
        AQ --> AR{Resolved by Remote Reboot}
        AR --> AS{Assigned to John Rommel Pedros}
        AS --> AT{Managed by Raymund Roda}
    end
