"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAdvanceTech } from "@/hooks/use_advance_tech";
import { useEvent } from "@/hooks/use_event";
import { useRecruit } from "@/hooks/use_recruit";
import { useTracks } from "@/hooks/use_tracks";
import { useTurn } from "@/hooks/use_turn";
import {
  BuildingType,
  IBOActions,
  ResourceType,
  rollForTechnology,
} from "@/utils/game_utilities";
import { ReactNode, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import LiquidGlass from "liquid-glass-react";

const BORDER_RADIUS = "8px";
const PADDING = "16px";
const GAP = "8px";
enum ICON_SIZES {
  XSMALL = "8px",
  SMALL = "16px",
  MEDIUM = "24px",
  LARGE = "32px",
  XLARGE = "48px",
}

const IMAGE_RESOURCES = {
  [ResourceType.FOOD]: "/icon_food.png",
  [ResourceType.WOOD]: "/icon_wood.png",
  [ResourceType.STONE]: "/icon_stone.png",
  [ResourceType.SCIENCE]: "/icon_science.png",
  [ResourceType.GOLD]: "/icon_gold.png",
};

export const Card = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      style={{
        position: "relative",
        width: "100%",
        padding: PADDING,
        borderRadius: BORDER_RADIUS,
        backgroundColor: "#ffffff2c",
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.202)",
        ...props.style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: BORDER_RADIUS,
          background:
            "radial-gradient(circle, rgba(223, 223, 223, 0.083) 70%, rgba(255, 255, 255, 0.335) 100%)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
};

export default function Home() {
  const { unlockedTechs, techCompleteGraph, unlockTech } = useAdvanceTech();
  const {
    addBuildingToTrack,
    buildStructure,
    track,
    trackSettlement,
    buildingsFinished,
  } = useTracks();
  const { recruit } = useRecruit(trackSettlement, buildingsFinished);
  const { nextTurn, currentTurn } = useTurn();
  const { decreaseTrackEvent, trackEvent } = useEvent();

  const [turnText, setTurnText] = useState<ReactNode>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <main
        style={{
          position: "relative",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: PADDING,
          gap: GAP,
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            backgroundImage: "url('/bg.webp')",
            filter: "blur(8px)",
          }}
        />
        <Card>
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              const action = nextTurn();

              switch (action) {
                case IBOActions.ADVANCE: {
                  const tech = rollForTechnology(unlockedTechs);
                  if (tech) {
                    unlockTech(tech);
                    decreaseTrackEvent();

                    if (tech.effectCategory) {
                      try {
                        addBuildingToTrack(tech.effectCategory);
                      } catch (error) {
                        console.log("Error adding building to track:", error);
                      }
                    }

                    setTurnText(
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>
                          Voy a investigar esta tecnología:{" "}
                          <strong>{tech.category}</strong> -{" "}
                          <strong>{tech.name}</strong>
                        </span>
                        <br />
                        <span>Descripción: {tech.description}</span>
                      </div>
                    );
                  }
                  break;
                }

                case IBOActions.BUILD: {
                  const { building, place } = buildStructure();
                  setTurnText(
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>
                        Voy a construir una estructura:{" "}
                        <strong>{building}</strong>.{" "}
                        {building !== BuildingType.SETTLEMENT && (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: GAP,
                            }}
                          >
                            En el lugar:
                            <Avatar>
                              <AvatarImage
                                src={IMAGE_RESOURCES[place as ResourceType]}
                                alt={place}
                                style={{ scale: "1.1" }}
                              />
                            </Avatar>
                          </span>
                        )}
                      </span>
                      {building === BuildingType.SETTLEMENT && (
                        <span>Construí una nueva ciudad.</span>
                      )}
                    </div>
                  );
                  break;
                }

                case IBOActions.INFLUENCE: {
                  setTurnText(
                    `Voy a intentar influenciar culturalmente la ciudad más cercana a mí.`
                  );
                  break;
                }

                case IBOActions.RECRUIT: {
                  const result = recruit();
                  setTurnText(
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: GAP,
                      }}
                    >
                      <span>
                        Voy a reclutar algunas unidades en mis ciudades:
                      </span>
                      <div>
                        {Object.entries(result).map(([resource, unit]) => (
                          <div
                            key={resource}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: GAP,
                              marginBottom: "4px",
                            }}
                          >
                            <Avatar>
                              <AvatarImage
                                src={IMAGE_RESOURCES[resource as ResourceType]}
                                alt={resource}
                                style={{ scale: "1.1" }}
                              />
                            </Avatar>
                            <span style={{ marginLeft: "4px" }}>{unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                  break;
                }

                case IBOActions.ATACK: {
                  setTurnText(
                    <>
                      <span>
                        Voy a moverme a una nueva ubicación, en dirección hacia
                        la ciduad enemiga más cercana. Si esta a mi alcance,
                        intentaré atacarla.
                      </span>
                    </>
                  );
                  break;
                }
              }
            }}
          >
            Siguiente turno
          </Button>
        </Card>

        <Card>{turnText}</Card>

        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            gap: GAP,
          }}
        >
          <span>Ciudades construídas</span>
          <div style={{ display: "flex", gap: GAP }}>
            {Object.entries(trackSettlement)
              .filter((e) => e[1])
              .map((e) => (
                <div key={e[0]}>
                  <Avatar>
                    <AvatarImage
                      src={IMAGE_RESOURCES[e[0] as ResourceType]}
                      alt={e[0]}
                      style={{ scale: "1.1" }}
                    />
                  </Avatar>
                </div>
              ))}
          </div>
        </Card>

        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            gap: GAP,
            width: "100%",
          }}
        >
          <span>Edificaciones desbloqueadas</span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: GAP,
            }}
          >
            {Object.entries(track)
              .filter(([, name]) => name)
              .map(([, name], i) => (
                <Badge key={`name-${i}`} className="rounded-full">
                  {name}
                </Badge>
              ))}
          </div>
        </Card>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: GAP,
          }}
        >
          <Card>Tecnologías desbloqueadas</Card>
          {Object.entries(techCompleteGraph).map(([category, values]) => (
            <Card
              key={category}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: GAP,
                padding: PADDING,
                borderRadius: BORDER_RADIUS,
                width: "auto",
                minWidth: "100px",
                height: "180px",
              }}
            >
              <span>{category}</span>
              {values.map((tech) => (
                <Badge key={tech.name} className="rounded-full">
                  {tech.name}
                </Badge>
              ))}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
