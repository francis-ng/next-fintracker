'use client'
import { Button, Drawer, Popover, useMediaQuery, useOverlayState } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

const round2 = (n: number) => Math.round(n * 100) / 100;

type PadKey = {
  key: string,
  label?: string,
  icon?: string,
  text?: string
};
const PAD_KEYS: PadKey[] = [
  { key: '1' }, { key: '2' }, { key: '3' }, { key: 'backspace', label: 'Backspace', icon: 'lucide:delete' },
  { key: '4' }, { key: '5' }, { key: '6' }, { key: 'clear', label: 'Clear', text: 'C' },
  { key: '7' }, { key: '8' }, { key: '9' }, { key: '.', label: 'Decimal point', text: '.' },
] as const;

interface NumberpadProps {
  label: string,
  value: number,
  onApply: (next: number) => void
}

function Numberpad({label, value, onApply}: NumberpadProps) {
  const [entry, setEntry] = useState('');
  const typed = entry === '' || entry === '.' ? 0 : parseFloat(entry);
  const canApply = typed !== 0;

  function press(key: string) {
    if (key === 'backspace') setEntry(e => e.slice(0, -1));
    else if (key === 'clear') setEntry('');
    else if (key === '.') setEntry(e => e === '' ? '0.' : e.includes('.') ? e : e + '.');
    else setEntry(e => e + key);
  }

  function apply(sign: 1 | -1) {
    onApply(round2(value + sign * typed));
  }

  return (
    <div className='flex flex-col gap-2 w-72 max-w-full mx-auto'>
      <div className='flex items-baseline justify-between gap-2 tabular-nums' aria-live='polite'>
        <span className='text-muted text-xs truncate'>{label || 'Amount'}</span>
        <span className='text-xl font-medium'>{entry === '' ? '0' : entry}</span>
      </div>
      <div className='grid grid-cols-4 gap-1.5' role='group' aria-label='Numberpad'>
        {PAD_KEYS.map(({key, label, icon, text}) => (
          <Button key={key} variant='tertiary' className='h-12 w-full rounded-lg' aria-label={label}
                  onPress={() => press(key)}>
            {icon ? <Icon icon={icon} width={22} height={22}/> : text ?? key}
          </Button>
        ))}
        <Button variant='tertiary' className='col-span-2 h-12 w-full rounded-lg' onPress={() => press('0')}>0</Button>
        <Button variant='tertiary' className='col-span-2 h-12 w-full rounded-lg' onPress={() => press('00')}>00</Button>
      </div>
      <div className='grid grid-cols-2 gap-1.5'>
        <Button variant='danger-soft' className="w-full" isDisabled={!canApply} onPress={() => apply(-1)}>
          <Icon icon='lucide:minus' width={24} height={24}/>
          {canApply && <span className='text-xs opacity-70'>{round2(value - typed).toLocaleString()}</span>}
        </Button>
        <Button variant='primary' className="w-full" isDisabled={!canApply} onPress={() => apply(1)}>
          <Icon icon='lucide:plus' width={24} height={24}/>
          {canApply && <span className='text-xs opacity-70'>{round2(value + typed).toLocaleString()}</span>}
        </Button>
      </div>
    </div>
  )
}

export default function AmountNumberpadToggle({label, value, onApply}: NumberpadProps) {
  const state = useOverlayState();
  const isMobile = useMediaQuery('(max-width: 767px)', { initializeWithValue: false });

  function applyWithClose(next: number) {
    onApply(next);
    state.close();
  }

  const toggle = (
    <Button isIconOnly variant='tertiary' className='h-21 order-2 row-span-2 md:order-3 md:h-9'
            aria-label='Open numberpad'>
      <Icon icon='lucide:calculator' width={24} height={24}/>
    </Button>
  );

  const pad = <Numberpad label={label} value={value} onApply={applyWithClose}/>;

  if (isMobile) {
    return (
      <Drawer state={state}>
        {toggle}
        <Drawer.Backdrop>
          <Drawer.Content placement='bottom'>
            <Drawer.Dialog aria-label='Amount numberpad'
                           className='pb-[calc(1.5rem+env(safe-area-inset-bottom))]'>
              {pad}
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    );
  }

  return (
    <Popover.Root isOpen={state.isOpen} onOpenChange={state.setOpen}>
      {toggle}
      <Popover.Content placement='bottom'>
        <Popover.Dialog aria-label='Amount numberpad'>
          {pad}
        </Popover.Dialog>
      </Popover.Content>
    </Popover.Root>
  );
}
