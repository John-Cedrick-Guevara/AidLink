import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectorList } from "@/types";
import {  TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const SectorCard = ({ sector, index }: { sector: SectorList, index: number }) => {
  return (
    <motion.div
      key={sector.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className={`hover:bg-linear-to-br from-primary/5 to-accent/5 glass-card p-8 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group 
                        `}
      >
        {/* Decorative gradient */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity `}
        />

        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-2xl font-bold tracking-tight">
              {sector.title}
            </h3>
            <Badge variant="default" className="font-semibold">
              {sector.projectCount}
            </Badge>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
              <span className="text-sm text-muted-foreground">
                Active Projects
              </span>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-lg font-bold">{sector.projectCount}</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
              <span className="text-sm text-muted-foreground">
                Total Raised
              </span>
              <span className="text-lg font-bold text-primary">
                ₱{(sector.totalRaised / 1000).toFixed(0)}K
              </span>
            </div>
          </div>

          {/* <div className="flex items-center justify-between text-sm font-semibold pt-4 border-t border-border/50">
                          <span className={"text-primary"}>
                      View projects
                          </span>
                          <ChevronRight
                            className={`w-5 h-5 transition-transform 
                            : "text-muted-foreground"
                            }
                            />
                        </div> */}
        </div>
      </Card>
    </motion.div>
  );
};

export default SectorCard;
