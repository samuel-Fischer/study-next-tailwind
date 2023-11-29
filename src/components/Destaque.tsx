import React, { useState } from "react";

interface EstrelaClicavelProps {
  id: number;
  destaque: boolean;
  onToggleDestaque: (id: number, destaque: boolean) => void;
}

const EstrelaClicavel: React.FC<EstrelaClicavelProps> = ({ id, destaque, onToggleDestaque }) => {
  const [hovered, setHovered] = useState(false);

  const handleToggleDestaque = () => {
    onToggleDestaque(id, !destaque);
  };

  return (
    <span
      className="cursor-pointer"
      onClick={handleToggleDestaque}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {destaque || hovered ? "⭐" : "☆"}
    </span>
  );
};

export default EstrelaClicavel;
