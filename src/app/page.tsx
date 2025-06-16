"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useAdvanceTech } from "../hooks/use_advance_tech";
import { ResultTrackEvent, useEvent } from "../hooks/use_event";
import { useRecruit } from "../hooks/use_recruit";
import { useTracks } from "../hooks/use_tracks";
import { useTurn } from "../hooks/use_turn";
import {
  BuildingType,
  IBOActions,
  ResourceType,
  rollForTechnology,
} from "../utils/game_utilities";
import { type ReactNode, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Building,
  Zap,
  Users,
  Target,
  Crown,
  Hammer,
  BookOpen,
  Dices,
  Boxes,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const IMAGE_RESOURCES = {
  [ResourceType.FOOD]: "/icon_food.png",
  [ResourceType.WOOD]: "/icon_wood.png",
  [ResourceType.STONE]: "/icon_stone.png",
  [ResourceType.SCIENCE]: "/icon_science.png",
  [ResourceType.GOLD]: "/icon_gold.png",
};

const GlassCard = ({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/10 backdrop-blur-xl
        border border-white/10
        shadow-2xl shadow-black/10
        ${className}
      `}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10 p-4">{children}</div>
    </div>
  );
};

const ResourceIcon = ({ resource }: { resource: ResourceType }) => {
  switch (resource) {
    case ResourceType.FOOD:
      return (
        <Avatar
          className="w-6 h-6 flex items-center justify-center"
          style={{
            border: "1px solid #fff",
          }}
        >
          <AvatarImage
            src={IMAGE_RESOURCES[ResourceType.FOOD]}
            alt="Food Resource"
            className="w-5 h-5 rounded-full scale-[1.9]"
          />
        </Avatar>
      );
    case ResourceType.WOOD:
      return (
        <Avatar
          className="w-6 h-6 flex items-center justify-center"
          style={{
            border: "1px solid #fff",
          }}
        >
          <AvatarImage
            src={IMAGE_RESOURCES[ResourceType.WOOD]}
            alt="Wood Resource"
            className="w-5 h-5 rounded-full scale-[1.9]"
          />
        </Avatar>
      );
    case ResourceType.STONE:
      return (
        <Avatar
          className="w-6 h-6 flex items-center justify-center"
          style={{
            border: "1px solid #fff",
          }}
        >
          <AvatarImage
            src={IMAGE_RESOURCES[ResourceType.STONE]}
            alt="Stone Resource"
            className="w-5 h-5 rounded-full scale-[1.9]"
          />
        </Avatar>
      );
    case ResourceType.SCIENCE:
      return (
        <Avatar
          className="w-6 h-6 flex items-center justify-center"
          style={{
            border: "1px solid #fff",
          }}
        >
          <AvatarImage
            src={IMAGE_RESOURCES[ResourceType.SCIENCE]}
            alt="Science Resource"
            className="w-5 h-5 rounded-full scale-[1.9]"
          />
        </Avatar>
      );
    case ResourceType.GOLD:
      return (
        <Avatar
          className="w-6 h-6 flex items-center justify-center"
          style={{
            border: "1px solid #fff",
          }}
        >
          <AvatarImage
            src={IMAGE_RESOURCES[ResourceType.GOLD]}
            alt="Gold Resource"
            className="w-5 h-5 rounded-full scale-[1.9]"
          />
        </Avatar>
      );
    default:
      return <div className="w-6 h-6 bg-gray-400 rounded-full" />;
  }
};

export default function Home() {
  const { unlockedTechs, techCompleteGraph, unlockTech } = useAdvanceTech();
  const {
    destroySettlement,
    addBuildingToTrack,
    buildStructure,
    track,
    trackSettlement,
    buildingsFinished,
    counterBuilding,
    buildingsFinishedNames,
  } = useTracks();
  const { recruit } = useRecruit(trackSettlement, buildingsFinished);
  const { nextTurn } = useTurn();
  const { decreaseTrackEvent, trackEvent } = useEvent();

  const [turnText, setTurnText] = useState<ReactNode>(null);
  const [turnCount, setTurnCount] = useState(0);

  const handleNextTurn = () => {
    const action = nextTurn();
    setTurnCount((prev) => prev + 1);

    switch (action) {
      case IBOActions.ADVANCE: {
        const tech = rollForTechnology(unlockedTechs);

        if (tech) {
          unlockTech(tech);
          const event = decreaseTrackEvent();

          if (event === ResultTrackEvent.USE_EVENT_CARD) {
            /*  alert("SE USA EVENTO"); */
          }

          if (tech.effectCategory) {
            try {
              addBuildingToTrack(tech.effectCategory);
            } catch (error) {
              console.log("Error adding building to track:", error);
            }
          }

          if (tech.advanceGovernment) {
            alert(`Gobierno desbloqueado`);
          }

          setTurnText(
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white">Nueva Tecnología</span>
              </div>
              <div className="space-y-2">
                <p className="text-white/90">
                  <span className="font-semibold text-blue-300">
                    {tech.category}
                  </span>{" "}
                  - {tech.name}
                </p>
                {tech.effectCategory && (
                  <p>
                    Se agrega{" "}
                    <span className="font-semibold text-yellow-300 capitalize">
                      {tech.effectCategory}
                    </span>{" "}
                    a edificio por construir
                  </p>
                )}
                {/* <p className="text-sm text-white/70">{tech.description}</p> */}
              </div>
            </div>
          );
        }
        break;
      }

      case IBOActions.BUILD: {
        const { building, place } = buildStructure();
        setTurnText(
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-green-400" />
              <span className="font-medium text-white">Construcción</span>
            </div>
            <div className="space-y-2">
              <p className="text-white/90">
                Construyendo:{" "}
                <span className="font-semibold text-green-300">{building}</span>
              </p>
              {building !== BuildingType.SETTLEMENT && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/70">Ubicación:</span>
                  <ResourceIcon resource={place as ResourceType} />
                  <span className="text-sm text-white/70">{place}</span>
                </div>
              )}
            </div>
          </div>
        );
        break;
      }

      case IBOActions.INFLUENCE: {
        setTurnText(
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-purple-400" />
              <span className="font-medium text-white">
                Influencia Cultural
              </span>
            </div>
            <p className="text-white/90">
              Intentando influenciar la ciudad más cercana
            </p>
          </div>
        );
        break;
      }

      case IBOActions.RECRUIT: {
        const result = recruit();
        setTurnText(
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-400" />
              <span className="font-medium text-white">Reclutamiento</span>
            </div>
            <div className="space-y-2">
              {Object.entries(result).map(([resource, unit]) => (
                <div key={resource} className="flex items-center gap-2">
                  <ResourceIcon resource={resource as ResourceType} />
                  <span className="text-sm text-white/90">{unit}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      }

      case IBOActions.ATACK: {
        setTurnText(
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-red-400" />
              <span className="font-medium text-white">
                Movimiento Militar / Ataque
              </span>
            </div>
            <p className="text-white/90">
              Avanzando hacia la ciudad enemiga más cercana
            </p>
          </div>
        );
        break;
      }
    }
  };

  const settledCities = Object.entries(trackSettlement).filter(
    ([, { active: built }]) => built
  );

  const unlockedBuildings = Object.entries(track).filter(([, name]) => name);
  const totalTechs = Object.values(techCompleteGraph).reduce(
    (acc, techs) => acc + techs.length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 p-4 space-y-4 max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <GlassCard>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Dices className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">
                  Clash of Cultures BOT
                </h1>
                <p className="text-white/60 text-sm">Turno #{turnCount}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Action Button */}
        <GlassCard>
          <Button
            onClick={handleNextTurn}
            className="w-full text-lg cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <Play className="w-5 h-5 mr-2" />
            Siguiente Turno
          </Button>
        </GlassCard>

        {/* Last Action */}
        {turnText && (
          <GlassCard>
            <div className="space-y-3">{turnText}</div>
          </GlassCard>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <GlassCard className="text-center">
            <Building className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {settledCities.filter((s) => !s[1].isDestroyed).length}
            </div>
            <div className="text-xs text-white/60">Ciudades</div>
          </GlassCard>
          <GlassCard className="text-center">
            <Hammer className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {counterBuilding}
            </div>
            <div className="text-xs text-white/60">Edificios</div>
          </GlassCard>
          <GlassCard className="text-center">
            <BookOpen className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{totalTechs}</div>
            <div className="text-xs text-white/60">Tecnologías</div>
          </GlassCard>
        </div>

        <GlassCard>
          <div className="space-y-3">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Boxes className="w-4 h-4" />
              Evento dentro de{" "}
              <span className="font-semibold text-yellow-300 ">
                {trackEvent}
              </span>{" "}
              avances
            </h3>
          </div>
        </GlassCard>

        {/* Cities */}
        {settledCities.length > 0 && (
          <GlassCard>
            <div className="space-y-3">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Building className="w-4 h-4" />
                Ciudades Establecidas
              </h3>
              <div className="flex flex-wrap gap-2">
                {settledCities.map(([resource, { isDestroyed }]) => (
                  <Badge
                    key={resource}
                    className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-2 cursor-pointer"
                    style={{
                      textDecoration: isDestroyed ? "line-through" : "none",
                    }}
                    onClick={() => {
                      if (isDestroyed) return;
                      destroySettlement(resource as ResourceType);
                    }}
                  >
                    <ResourceIcon resource={resource as ResourceType} />
                    <span className="text-sm text-white/90">{resource}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </GlassCard>
        )}

        <GlassCard>
          <div className="space-y-3">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Building className="w-4 h-4" />
              Edificios Construidos
            </h3>
            <div className="flex flex-wrap gap-2">
              {buildingsFinishedNames.map((building, i) => (
                <Badge
                  key={`building-${i}`}
                  className="bg-green-500/20 text-green-300 border-green-500/30 rounded-full"
                >
                  {building}
                </Badge>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Buildings */}
        {unlockedBuildings.length > 0 && (
          <GlassCard>
            <div className="space-y-3">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Hammer className="w-4 h-4" />
                Edificios por Construir
              </h3>
              <div className="flex flex-wrap gap-2">
                {unlockedBuildings.map(([, name], i) => (
                  <Badge
                    key={`building-${i}`}
                    className="bg-green-500/20 text-green-300 border-green-500/30 rounded-full"
                  >
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          </GlassCard>
        )}

        {/* Technologies */}
        {totalTechs > 0 && (
          <GlassCard>
            <div className="space-y-4">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Tecnologías Investigadas
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {Object.entries(techCompleteGraph)
                  .filter(([, techs]) => techs.length > 0)
                  .map(([category, techs]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium text-white/80 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-1 ml-4">
                        {techs.map((tech) => (
                          <Badge
                            key={tech.name}
                            className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs rounded-full"
                          >
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </GlassCard>
        )}

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-white/40 text-xs">
            Bot de Civilización • Automatizado
          </p>
        </div>
      </div>
    </div>
  );
}
