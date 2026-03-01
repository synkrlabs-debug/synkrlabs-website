
import { Hexagon, Dna, Cpu } from 'lucide-react';
import './DeepTechViz.css';

const DeepTechViz = ({ className = "" }) => {
    return (
        <div className={`dtv-container ${className}`}>

            {/* Outer Ring - Clean Line */}
            <div className="dtv-ring dtv-ring-outer dtv-spin-slow"></div>

            {/* Dashed Middle Ring - Technical Detail */}
            <div className="dtv-ring dtv-ring-middle dtv-spin-reverse-slow"></div>

            {/* Inner Pulse Ring - Subtle Energy */}
            <div className="dtv-ring dtv-ring-inner dtv-pulse"></div>

            {/* Orbiting Dot 1 (Outer) */}
            <div className="dtv-orbit dtv-spin-slow">
                <div className="dtv-dot dtv-dot-1"></div>
            </div>

            {/* Orbiting Dot 2 (Middle) */}
            <div className="dtv-orbit dtv-orbit-middle dtv-spin-reverse-slow">
                <div className="dtv-dot dtv-dot-2"></div>
            </div>

            {/* Orbiting Dot 3 (Inner) */}
            <div className="dtv-orbit dtv-orbit-inner dtv-spin-medium">
                <div className="dtv-dot dtv-dot-3"></div>
            </div>

            {/* Central Core */}
            <div className="dtv-core-group">
                <div className="dtv-core">
                    <div className="dtv-core-borders dtv-core-border-1"></div>
                    <div className="dtv-core-borders dtv-core-border-2"></div>

                    <Hexagon size={64} className="dtv-hexagon dtv-pulse-slow" strokeWidth={1} />
                </div>

                {/* Floating Data Points */}
                <div className="dtv-data-panel dtv-float-1 top-panel">
                    <Dna size={16} className="dtv-icon-orange" />
                    <div className="dtv-data-text">
                        <span className="dtv-data-label">DATA_STREAM</span>
                        <span className="dtv-data-value">BIO_SEQ</span>
                    </div>
                </div>

                <div className="dtv-data-panel dtv-float-2 bottom-panel">
                    <Cpu size={16} className="dtv-icon-amber" />
                    <div className="dtv-data-text">
                        <span className="dtv-data-label">PROCESSOR</span>
                        <span className="dtv-data-value">Q_CORE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeepTechViz;
