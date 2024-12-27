import { useState } from 'react';
import { Target, X, Check } from 'lucide-react';
import type { GameType, GaugeType, BirdResult } from '../../types';

interface ScoreEntryProps {
  onSubmit: (score: {
    game: GameType;
    gauge: GaugeType;
    birds: BirdResult[];
    total_score: number;
  }) => void;
}

const GAME_TYPES: GameType[] = ['Skeet', 'Doubles Skeet', 'Trap', '5-Stand'];
const GAUGE_TYPES: GaugeType[] = ['12', '20', '28', '.410'];
const BIRDS_PER_ROUND = 25;

export function ScoreEntry({ onSubmit }: ScoreEntryProps) {
  const [game, setGame] = useState<GameType>('Skeet');
  const [gauge, setGauge] = useState<GaugeType>('12');
  const [birds, setBirds] = useState<BirdResult[]>([]);

  const handleBirdResult = (result: BirdResult) => {
    if (birds.length < BIRDS_PER_ROUND) {
      setBirds([...birds, result]);
    }
  };

  const handleUndo = () => {
    setBirds(birds.slice(0, -1));
  };

  const handleSubmit = () => {
    if (birds.length === BIRDS_PER_ROUND) {
      const total_score = birds.filter(result => result === 'hit').length;
      onSubmit({ game, gauge, birds, total_score });
      setBirds([]);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Enter New Score
        </h3>
        
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Game Type
            </label>
            <select
              value={game}
              onChange={(e) => setGame(e.target.value as GameType)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {GAME_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gauge
            </label>
            <select
              value={gauge}
              onChange={(e) => setGauge(e.target.value as GaugeType)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {GAUGE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Birds: {birds.length} / {BIRDS_PER_ROUND}
            </span>
            <button
              type="button"
              onClick={handleUndo}
              disabled={birds.length === 0}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Undo
            </button>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleBirdResult('hit')}
              disabled={birds.length === BIRDS_PER_ROUND}
              className="flex-1 inline-flex items-center justify-center px-4 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              <Check className="h-6 w-6 mr-2" />
              Hit
            </button>
            <button
              type="button"
              onClick={() => handleBirdResult('miss')}
              disabled={birds.length === BIRDS_PER_ROUND}
              className="flex-1 inline-flex items-center justify-center px-4 py-4 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              <X className="h-6 w-6 mr-2" />
              Miss
            </button>
          </div>

          {birds.length === BIRDS_PER_ROUND && (
            <div className="mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Target className="h-5 w-5 mr-2" />
                Submit Score
              </button>
            </div>
          )}
        </div>

        {birds.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {birds.map((bird, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    bird === 'hit'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {index + 1}: {bird === 'hit' ? 'Hit' : 'Miss'}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}