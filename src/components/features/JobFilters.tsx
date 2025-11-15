import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { Slider } from '../ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { X, Filter, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react'

interface JobFiltersProps {
  filters: {
    location: string
    jobType: string
    experience: string
    salaryRange: number[]
    remote: boolean
    skills: string[]
  }
  onFilterChange: (filters: any) => void
  onClearFilters: () => void
}

export default function JobFilters({ filters, onFilterChange, onClearFilters }: JobFiltersProps) {
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']
  const experienceLevels = ['Entry Level (0-1 year)', '1-3 years', '3-5 years', '5-10 years', '10+ years']
  const locations = [
    'Dubai, UAE', 'Riyadh, Saudi Arabia', 'Cairo, Egypt', 'Kuwait City, Kuwait',
    'Amman, Jordan', 'Beirut, Lebanon', 'Doha, Qatar', 'Manama, Bahrain'
  ]

  const popularSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript',
    'React Native', 'Flutter', 'Angular', 'Vue.js', 'PHP', 'Laravel',
    'MySQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes',
    'Marketing', 'SEO', 'Social Media', 'Content Writing', 'Graphic Design',
    'UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Photography'
  ]

  const updateFilter = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const toggleSkill = (skill: string) => {
    const skills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill]
    updateFilter('skills', skills)
  }

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold flex items-center space-x-2 space-x-reverse">
          <Filter className="w-5 h-5" />
          <span>تصفية النتائج</span>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          <X className="w-4 h-4 mr-2" />
          مسح الكل
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Location Filter */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2 space-x-reverse text-sm font-medium">
            <MapPin className="w-4 h-4" />
            <span>الموقع</span>
          </Label>
          <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الموقع" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Type Filter */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2 space-x-reverse text-sm font-medium">
            <Briefcase className="w-4 h-4" />
            <span>نوع الوظيفة</span>
          </Label>
          <Select value={filters.jobType} onValueChange={(value) => updateFilter('jobType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر نوع الوظيفة" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Experience Filter */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2 space-x-reverse text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>سنوات الخبرة</span>
          </Label>
          <Select value={filters.experience} onValueChange={(value) => updateFilter('experience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر مستوى الخبرة" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2 space-x-reverse text-sm font-medium">
            <DollarSign className="w-4 h-4" />
            <span>نطاق الراتب (USD)</span>
          </Label>
          <div className="px-3">
            <Slider
              value={filters.salaryRange}
              onValueChange={(value) => updateFilter('salaryRange', value)}
              max={50000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>${filters.salaryRange[0].toLocaleString()}</span>
              <span>${filters.salaryRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Remote Work */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox 
            id="remote" 
            checked={filters.remote}
            onCheckedChange={(checked) => updateFilter('remote', checked)}
          />
          <Label htmlFor="remote" className="text-sm font-medium">
            العمل عن بُعد فقط
          </Label>
        </div>

        {/* Skills Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">المهارات</Label>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
            {popularSkills.map((skill) => (
              <Badge
                key={skill}
                variant={filters.skills.includes(skill) ? 'default' : 'outline'}
                className={`cursor-pointer transition-colors ${
                  filters.skills.includes(skill)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/10'
                }`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {(filters.location || filters.jobType || filters.experience || filters.remote || filters.skills.length > 0) && (
          <div className="pt-4 border-t border-gray-200">
            <Label className="text-sm font-medium mb-3 block">المرشحات النشطة</Label>
            <div className="flex flex-wrap gap-2">
              {filters.location && (
                <Badge variant="secondary" className="flex items-center space-x-1 space-x-reverse">
                  <span>{filters.location}</span>
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => updateFilter('location', '')}
                  />
                </Badge>
              )}
              {filters.jobType && (
                <Badge variant="secondary" className="flex items-center space-x-1 space-x-reverse">
                  <span>{filters.jobType}</span>
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => updateFilter('jobType', '')}
                  />
                </Badge>
              )}
              {filters.remote && (
                <Badge variant="secondary" className="flex items-center space-x-1 space-x-reverse">
                  <span>عمل عن بُعد</span>
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => updateFilter('remote', false)}
                  />
                </Badge>
              )}
              {filters.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center space-x-1 space-x-reverse">
                  <span>{skill}</span>
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => toggleSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}