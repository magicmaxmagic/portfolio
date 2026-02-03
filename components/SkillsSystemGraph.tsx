'use client';

import { useState } from 'react';

interface Cluster {
  name: string;
  angle: number; // 0-360 degrees
  skills: string[];
  color: string;
}

const clusters: Cluster[] = [
  {
    name: 'Machine Learning',
    angle: 0,
    skills: ['PyTorch', 'Scikit-learn', 'LLMs & Transformers'],
    color: 'hsl(200, 100%, 50%)',
  },
  {
    name: 'Data Engineering',
    angle: 72,
    skills: ['Databricks', 'Spark', 'Snowflake'],
    color: 'hsl(140, 100%, 45%)',
  },
  {
    name: 'MLOps & Infrastructure',
    angle: 144,
    skills: ['Docker', 'Kubernetes', 'Metaflow'],
    color: 'hsl(280, 100%, 50%)',
  },
  {
    name: 'Product & Business',
    angle: 216,
    skills: ['Systems thinking', 'Decision-making', 'ROI & metrics'],
    color: 'hsl(40, 100%, 50%)',
  },
  {
    name: 'Communication',
    angle: 288,
    skills: ['Storytelling', 'Stakeholder alignment', 'Documentation'],
    color: 'hsl(320, 100%, 50%)',
  },
];

const RADIUS = 120;
const CENTER_X = 200;
const CENTER_Y = 200;

export function SkillsSystemGraph() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  const getPosition = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER_X + radius * Math.cos(rad),
      y: CENTER_Y + radius * Math.sin(rad),
    };
  };

  const centerPos = { x: CENTER_X, y: CENTER_Y };

  return (
    <div className="flex flex-col items-center gap-8">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="w-full max-w-md"
      >
        {/* Defs for styling */}
        <defs>
          <style>{`
            .cluster-circle {
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .cluster-circle:hover {
              filter: brightness(1.2);
            }
            .cluster-label {
              font-weight: 600;
              font-size: 12px;
              text-anchor: middle;
              pointer-events: none;
              fill: white;
            }
            .connection-line {
              stroke-width: 1;
              opacity: 0.3;
              transition: opacity 0.3s ease;
            }
            .connection-line.active {
              opacity: 0.8;
              stroke-width: 2;
            }
            .center-circle {
              fill: hsl(200, 80%, 50%);
              transition: all 0.3s ease;
            }
            .center-label {
              font-weight: 700;
              font-size: 14px;
              text-anchor: middle;
              dominant-baseline: middle;
              fill: white;
              pointer-events: none;
            }
          `}</style>
        </defs>

        {/* Connection lines from center to clusters */}
        {clusters.map((cluster) => {
          const clusterPos = getPosition(cluster.angle, RADIUS);
          const isActive =
            activeCluster === null || activeCluster === cluster.name;
          return (
            <line
              key={`line-${cluster.name}`}
              x1={centerPos.x}
              y1={centerPos.y}
              x2={clusterPos.x}
              y2={clusterPos.y}
              className={`connection-line ${isActive ? 'active' : ''}`}
              stroke={cluster.color}
            />
          );
        })}

        {/* Cluster nodes */}
        {clusters.map((cluster) => {
          const pos = getPosition(cluster.angle, RADIUS);
          const opacity = activeCluster && activeCluster !== cluster.name ? 0.3 : 1;

          return (
            <g
              key={cluster.name}
              onMouseEnter={() => setActiveCluster(cluster.name)}
              onMouseLeave={() => setActiveCluster(null)}
              style={{ opacity, transition: 'opacity 0.3s ease' }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r="32"
                className="cluster-circle"
                fill={cluster.color}
              />
              <text x={pos.x} y={pos.y} className="cluster-label">
                {cluster.name.split(' ').length > 1
                  ? cluster.name.split(' ').map((w) => w[0]).join('')
                  : cluster.name.substring(0, 2).toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Center node */}
        <circle cx={centerPos.x} cy={centerPos.y} r="28" className="center-circle" />
        <text x={centerPos.x} y={centerPos.y} className="center-label">
          Applied<tspan x={centerPos.x} dy="1.2em">
            ML Systems
          </tspan>
        </text>
      </svg>

      {/* Skills legend */}
      <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 pt-4">
        {clusters.map((cluster) => (
          <div
            key={cluster.name}
            onMouseEnter={() => setActiveCluster(cluster.name)}
            onMouseLeave={() => setActiveCluster(null)}
            className="p-3 rounded-lg bg-[color:var(--bg-secondary)] border border-transparent hover:border-[color:var(--accent-blue)] transition-all cursor-pointer"
            style={{
              opacity:
                activeCluster === null || activeCluster === cluster.name ? 1 : 0.4,
            }}
          >
            <h4
              className="text-xs font-bold mb-2 truncate"
              style={{ color: cluster.color }}
            >
              {cluster.name}
            </h4>
            <ul className="text-xs space-y-1 text-[color:var(--text-secondary)]">
              {cluster.skills.map((skill) => (
                <li key={skill} className="truncate">
                  • {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Info text */}
      <p className="text-sm text-[color:var(--text-secondary)] text-center max-w-md pt-4">
        Hover to explore connections between skills. Each system supports the others: ML decisions
        require data infrastructure, infrastructure requires operational thinking, operations require
        clear communication with stakeholders.
      </p>
    </div>
  );
}
