'use client';

import {useState, useRef} from 'react';
import {generateLifeform} from '@/ai/flows/generate-lifeform';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Copy, Download} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';

export default function Home() {
  const [environmentalConditions, setEnvironmentalConditions] = useState('');
  const [desiredTraits, setDesiredTraits] = useState('');
  const [lifeform, setLifeform] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();
  const mdRef = useRef(null);

  const handleGenerateLifeform = async () => {
    setIsLoading(true);
    try {
      const result = await generateLifeform({
        environmentalConditions: environmentalConditions,
        desiredTraits: desiredTraits,
      });
      setLifeform({
        ...result,
        environmentalConditions: environmentalConditions,
        desiredTraits: desiredTraits,
      }); // Store user inputs
    } catch (error) {
      console.error('Failed to generate lifeform:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate lifeform. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateNewGeneration = async (
    parentType: 'single' | 'bi'
  ) => {
    setIsLoading(true);
    try {
      // Basic implementation for generating a new generation.
      // You might want to adjust environmental conditions and traits slightly.
      const newEnvironmentalConditions =
        lifeform?.environmentalConditions || environmentalConditions;
      const newDesiredTraits = lifeform?.desiredTraits || desiredTraits;

      const result = await generateLifeform({
        environmentalConditions: newEnvironmentalConditions,
        desiredTraits: newDesiredTraits,
      });
      setLifeform({
        ...result,
        environmentalConditions: newEnvironmentalConditions,
        desiredTraits: newDesiredTraits,
      }); // Store user inputs
      toast({
        title: 'Success',
        description: `New generation generated with ${parentType} parent.`,
      });
    } catch (error) {
      console.error('Failed to generate lifeform:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate lifeform. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!lifeform) {
      toast({
        title: 'Error',
        description: 'No lifeform generated yet.',
        variant: 'destructive',
      });
      return;
    }

    const markdownContent = `# Generated Lifeform: ${lifeform.lifeformName}

## User Request
- **Environmental Conditions:** ${lifeform.environmentalConditions}
- **Desired Traits:** ${lifeform.desiredTraits}

## Lifeform Details
- **Characteristics:** ${lifeform.characteristics}
- **Potential Environment:** ${lifeform.potentialEnvironment}
- **Basic Metabolism:** ${lifeform.basicMetabolism}
- **Cycle of Life:** ${lifeform.cycleOfLife}
- **Food:** ${lifeform.food}
- **Conditions for Unlimited Life:** ${lifeform.conditionsForUnlimitedLife}
`;

    const blob = new Blob([markdownContent], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lifeform.lifeformName}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    if (!lifeform) {
      toast({
        title: 'Error',
        description: 'No lifeform generated yet.',
        variant: 'destructive',
      });
      return;
    }

    const markdownContent = `# Generated Lifeform: ${lifeform.lifeformName}

## User Request
- **Environmental Conditions:** ${lifeform.environmentalConditions}
- **Desired Traits:** ${lifeform.desiredTraits}

## Lifeform Details
- **Characteristics:** ${lifeform.characteristics}
- **Potential Environment:** ${lifeform.potentialEnvironment}
- **Basic Metabolism:** ${lifeform.basicMetabolism}
- **Cycle of Life:** ${lifeform.cycleOfLife}
- **Food:** ${lifeform.food}
- **Conditions for Unlimited Life:** ${lifeform.conditionsForUnlimitedLife}
`;

    navigator.clipboard
      .writeText(markdownContent)
      .then(() => {
        toast({
          title: 'Copied!',
          description: 'Markdown content copied to clipboard.',
        });
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast({
          title: 'Error',
          description: 'Failed to copy content to clipboard.',
          variant: 'destructive',
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 bg-background">
      <h1 className="text-4xl font-bold mb-8 text-primary">
        NEOLOGY - Hydrogen Lifeform Generator
      </h1>

      {/* Input Section */}
      <Card className="w-full max-w-3xl mb-8">
        <CardHeader>
          <CardTitle>Lifeform Parameters</CardTitle>
          <CardDescription>
            Specify the conditions and traits for your unique lifeform.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="environmentalConditions">
              Environmental Conditions:
            </Label>
            <Textarea
              id="environmentalConditions"
              placeholder="e.g., High temperature, low pressure, intense radiation"
              value={environmentalConditions}
              onChange={e => setEnvironmentalConditions(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desiredTraits">Desired Traits:</Label>
            <Textarea
              id="desiredTraits"
              placeholder="e.g., Large size, bioluminescent, docile"
              value={desiredTraits}
              onChange={e => setDesiredTraits(e.target.value)}
            />
          </div>
          <Button onClick={handleGenerateLifeform} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Lifeform'}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      {lifeform && (
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-accent">Generated Lifeform</CardTitle>
            <CardDescription>
              Behold the marvel of hydrogen-based evolution!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Environmental Conditions:</Label>
              <Input
                type="text"
                value={lifeform.environmentalConditions}
                readOnly
                className="bg-secondary/20"
              />
            </div>
            <div className="grid gap-2">
              <Label>Desired Traits:</Label>
              <Input
                type="text"
                value={lifeform.desiredTraits}
                readOnly
                className="bg-secondary/20"
              />
            </div>
            <div className="grid gap-2">
              <Label>Lifeform Name:</Label>
              <Input
                type="text"
                value={lifeform.lifeformName}
                readOnly
                className="bg-secondary/20"
              />
            </div>
            <div className="grid gap-2">
              <Label>Characteristics:</Label>
              <Textarea
                value={lifeform.characteristics}
                readOnly
                className="bg-secondary/20"
              />
            </div>
            <div className="grid gap-2">
              <Label>Potential Environment:</Label>
              <Textarea
                value={lifeform.potentialEnvironment}
                readOnly
                className="bg-secondary/20"
              />
            </div>
            <div className="grid gap-2">
              <Label>Basic Metabolism:</Label>
              <Textarea
                value={lifeform.basicMetabolism}
                readOnly
                className="bg-secondary/20"
              />
            </div>
            <div className="grid gap-2">
              <Label>Cycle of Life:</Label>
              <Textarea
                value={lifeform.cycleOfLife}
                readOnly
                className="bg-secondary/20"
              />
            </div>
            <div className="grid gap-2">
              <Label>Food:</Label>
              <Textarea value={lifeform.food} readOnly className="bg-secondary/20" />
            </div>
            <div className="grid gap-2">
              <Label>Conditions for Unlimited Life:</Label>
              <Textarea
                value={lifeform.conditionsForUnlimitedLife}
                readOnly
                className="bg-secondary/20"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleGenerateNewGeneration('single')}
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate New (Single)'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleGenerateNewGeneration('bi')}
                  disabled={isLoading}
                  className="ml-2"
                >
                  {isLoading ? 'Generating...' : 'Generate New (Bi)'}
                </Button>
              </div>
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyMarkdown}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy as MD
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDownloadMarkdown}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download as MD
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
