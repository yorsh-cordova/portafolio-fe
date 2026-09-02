import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faCloud, faUsersGear } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "Java",
    "Bash",
    "Groovy",
    "Terraform",
    "Git",
    "Linux",
    "PostgreSQL",
    "Kubernetes",
    "Docker",
    "Jenkins"
];

const labelsSecond = [
    "Datadog",
    "Grafana",
    "PagerDuty",
    "ServiceNow",
    "Nginx",
    "AWS",
    "GCP",
    "CI/CD",
    "Monitoring",
    "High Availability",
];

const labelsThird = [
    "SLO/SLA",
    "RTO/RPO",
    "DR/BCM",
    "Incident Management",
    "Change Management",
    "Problem Management",
    "RCA",
    "Mentoring",
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faServer} size="3x"/>
                    <h3>Site Reliability Engineering</h3>
                    <p>I lead SRE initiatives focused on automation, secure environments, and platform resilience. My background combines software engineering with operational excellence to improve reliability at scale.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faCloud} size="3x"/>
                    <h3>Cloud Operations & Observability</h3>
                    <p>I build and operate cloud platforms across AWS and GCP, with strong focus on uptime, monitoring, and incident response. I design support models and processes that improve service quality across large teams.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faUsersGear} size="3x"/>
                    <h3>Reliability Strategy & Leadership</h3>
                    <p>I mentor engineers in cloud adoption and SRE practices while partnering with architecture teams to define reliability targets from day one, including SLO/SLA, RTO/RPO, and disaster recovery readiness.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;