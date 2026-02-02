import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DropdownFilter = ({ status, menu, onSelect, label }) => {
    return (
        <div className="flex flex-col gap-2">
            {label && <Label className="text-sm font-medium">{label}</Label>}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{status}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        {menu.map((item, index) => (
                            <DropdownMenuItem
                                key={index}
                                value={item}
                                onClick={() => onSelect(item)}>
                                {item}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default DropdownFilter;