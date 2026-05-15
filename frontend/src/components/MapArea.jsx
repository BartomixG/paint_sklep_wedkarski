import { useState } from 'react';
import { MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';


const MapArea = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      <div className="flex flex-col lg:flex-row">
        

        <div className="w-full lg:w-2/3 p-8 bg-slate-50 relative min-h-[500px] flex items-center justify-center">
          <h2 className="absolute top-8 left-8 text-2xl font-black text-slate-800 flex items-center gap-2">
            <MapPin className="text-blue-500" /> Plan Łowiska
          </h2>
        </div>

        {/* Paneln informacyjny i rezerwacja */}
        <div className="w-full lg:w-1/3 p-8 border-l border-slate-100 bg-white">
              <p className="text-lg">Wybierz stanowisko na mapie, aby zobaczyć szczegóły i dokonać rezerwacji.</p>
        </div>

      </div>
    </div>
  );
};

export default MapArea;