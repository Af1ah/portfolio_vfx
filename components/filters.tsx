import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, Search } from "lucide-react"

interface FiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

export default function Filters({ activeFilter, setActiveFilter, searchQuery, setSearchQuery, isFilterOpen, setIsFilterOpen }: FiltersProps) {
  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveFilter}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="posters">Posters</TabsTrigger>
            <TabsTrigger value="vfx">VFX</TabsTrigger>
            <TabsTrigger value="motion">Motion</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex w-full md:w-auto gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="md:hidden bg-card border border-border rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">Additional Filters</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="featured" className="mr-2" />
              <label htmlFor="featured">Featured Projects</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="recent" className="mr-2" />
              <label htmlFor="recent">Recent Projects</label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}