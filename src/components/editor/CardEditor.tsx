import { BasicInfoSection } from './BasicInfoSection'
import { ImageSection } from './ImageSection'
import { AbilitySection } from './AbilitySection'
import { AttacksSection } from './AttacksSection'
import { StatsSection } from './StatsSection'
import { FlavorSection } from './FlavorSection'

export function CardEditor() {
  return (
    <div className="space-y-6">
      <BasicInfoSection />
      <hr className="border-gray-200" />
      <ImageSection />
      <hr className="border-gray-200" />
      <AbilitySection />
      <hr className="border-gray-200" />
      <AttacksSection />
      <hr className="border-gray-200" />
      <StatsSection />
      <hr className="border-gray-200" />
      <FlavorSection />
    </div>
  )
}
